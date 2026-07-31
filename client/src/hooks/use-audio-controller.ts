import { useCallback, useEffect, useRef, useState } from "react";

/* Swap this file for the licensed cinematic ambient track later — nothing
   else in this hook, or in Navbar.tsx, needs to change. See the legal note
   in the task that introduced this: the current file is a private
   localhost test track only, not cleared for public/commercial use. */
const AUDIO_SRC = "/audio/lux-ambient-preview.mp3";

const TARGET_VOLUME = 0.2;
const FADE_IN_MS = 1000;
const FADE_OUT_MS = 700;
const FADE_STEP_MS = 40;

const SOUND_PREFERENCE_KEY = "lux-sound-preference";

/**
 * Owns a single <audio> element for the whole site. Meant to be called once,
 * from a component that stays mounted across route changes (Navbar), so the
 * same element — and its play position — survives client-side navigation.
 */
export function useAudioController() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Created once, lazily, so this hook is harmless during any non-browser
  // render (SSR/tests) and never re-creates the element on re-render.
  if (audioRef.current === null && typeof Audio !== "undefined") {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;
  }

  const clearFade = useCallback(() => {
    if (fadeFrameRef.current !== null) {
      window.clearInterval(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }
  }, []);

  // Fades audio.volume from its current value to `target` over `durationMs`,
  // in fixed-size steps (not requestAnimationFrame — a volume ramp doesn't
  // need to be frame-perfect, and a plain interval keeps fading correctly
  // even in a throttled/background tab).
  const fadeTo = useCallback(
    (target: number, durationMs: number, onComplete?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;
      clearFade();

      const steps = Math.max(1, Math.round(durationMs / FADE_STEP_MS));
      const start = audio.volume;
      const stepSize = (target - start) / steps;
      let stepsDone = 0;

      fadeFrameRef.current = window.setInterval(() => {
        stepsDone += 1;
        if (stepsDone >= steps) {
          audio.volume = target;
          clearFade();
          onComplete?.();
          return;
        }
        audio.volume = Math.min(1, Math.max(0, start + stepSize * stepsDone));
      }, FADE_STEP_MS);
    },
    [clearFade],
  );

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // play() only resolves/rejects after the browser decides whether this
    // gesture is allowed to start audio — resolving is our real signal that
    // playback actually began, not just that we called .play().
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        fadeTo(TARGET_VOLUME, FADE_IN_MS);
        try {
          window.localStorage.setItem(SOUND_PREFERENCE_KEY, "on");
        } catch {
          // Storage can be unavailable (private mode, disabled cookies) —
          // the preference just won't persist, nothing else depends on it.
        }
      })
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.warn("[lux-audio] playback blocked or failed:", error);
        }
        setIsPlaying(false);
      });
  }, [fadeTo]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsPlaying(false);
    fadeTo(0, FADE_OUT_MS, () => audio.pause());
    try {
      window.localStorage.setItem(SOUND_PREFERENCE_KEY, "off");
    } catch {
      // Same as above — best effort only.
    }
  }, [fadeTo]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  // Navbar (this hook's owner) stays mounted across every real page route,
  // so this cleanup never fires during normal navigation — only if its
  // owner is actually torn down (e.g. the dashboard route, which renders
  // without a Navbar at all). Without an explicit pause here, the
  // HTMLAudioElement would keep playing in the background with nothing left
  // that can ever stop it, since a fresh mount would create a brand new one.
  useEffect(() => {
    return () => {
      clearFade();
      audioRef.current?.pause();
    };
  }, [clearFade]);

  return { isPlaying, toggle };
}
