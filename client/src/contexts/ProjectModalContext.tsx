import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

type ProjectModalContextValue = {
  isOpen: boolean;
  openProjectModal: () => void;
  closeProjectModal: () => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
};

const ProjectModalContext = createContext<ProjectModalContextValue | null>(null);

export const ProjectModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Remembers whatever was focused right before opening, so focus can return
  // there when the modal closes (Radix only does this automatically when the
  // dialog is opened via its own Trigger, which we don't use here).
  const triggerRef = useRef<HTMLElement | null>(null);

  const openProjectModal = useCallback(() => {
    triggerRef.current = (document.activeElement as HTMLElement) ?? null;
    setIsOpen(true);
  }, []);

  const closeProjectModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ProjectModalContext.Provider
      value={{ isOpen, openProjectModal, closeProjectModal, triggerRef }}
    >
      {children}
    </ProjectModalContext.Provider>
  );
};

export const useProjectModal = () => {
  const ctx = useContext(ProjectModalContext);
  if (!ctx) {
    throw new Error("useProjectModal must be used within a ProjectModalProvider");
  }
  return ctx;
};
