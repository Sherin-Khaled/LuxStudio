import { useEffect, useState, type FormEvent } from "react";
import { useSEO } from "@/lib/seo/useSEO";
import { pageMeta } from "@/lib/seo/pageMeta";

type SubmissionStatus = "new" | "reviewed" | "replied" | "archived";

type ContactSubmission = {
  id: string;
  name: string;
  contact: string;
  company: string | null;
  projectType: string | null;
  budget: string | null;
  timeline: string | null;
  message: string;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
};

type NewsletterSubscription = {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  status: "active" | "unsubscribed";
  createdAt: string;
};

const statusStyles: Record<SubmissionStatus, string> = {
  new: "border-[#38bdf850] bg-[#38bdf815] text-[#7dd3fc]",
  reviewed: "border-[#a78bfa50] bg-[#a78bfa15] text-[#c4b5fd]",
  replied: "border-[#34d39950] bg-[#34d39915] text-[#6ee7b7]",
  archived: "border-white/20 bg-white/[0.04] text-[#f5f7fa60]",
};

const fieldControl =
  "w-full rounded-xl border border-white/[0.12] bg-white/[0.03] px-4 py-3 [font-family:'Inter',Helvetica] text-[14px] text-[#f5f7fa] outline-none transition-colors placeholder:text-[#f5f7fa40] focus:border-[#38bdf870] focus:bg-white/[0.05]";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const LoginScreen = ({ onSuccess }: { onSuccess: () => void }) => {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data.message || "Incorrect password.");
        setStatus("error");
        return;
      }
      onSuccess();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#03050a] px-6">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-[380px] flex-col gap-5 rounded-[24px] border border-white/[0.12] bg-white/[0.03] p-8 backdrop-blur-sm"
      >
        <div>
          <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[2px] text-[#f5f7fa55] uppercase">
            Lux Studio
          </p>
          <h1 className="mt-2 [font-family:'Bricolage_Grotesque',Helvetica] text-[26px] font-medium text-[#f5f7fa]">
            Dashboard login
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="admin-password" className="[font-family:'Inter',Helvetica] text-[13px] font-medium text-[#f5f7faa6]">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            className={fieldControl}
          />
        </div>
        {status === "error" && (
          <p role="alert" className="rounded-xl border border-[#f8717140] bg-[#f8717112] px-4 py-3 text-[13.5px] text-[#fca5a5]">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 rounded-full bg-[#f5f7fa] px-6 py-3 [font-family:'Inter',Helvetica] text-[14px] font-medium text-[#080b12] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
};

const StatusSelect = ({
  submission,
  onChange,
}: {
  submission: ContactSubmission;
  onChange: (id: string, status: SubmissionStatus) => void;
}) => (
  <select
    value={submission.status}
    onChange={(e) => onChange(submission.id, e.target.value as SubmissionStatus)}
    className={`rounded-full border px-3 py-1.5 [font-family:'Inter',Helvetica] text-[12.5px] font-medium outline-none ${statusStyles[submission.status]}`}
  >
    <option value="new" className="bg-[#03050a] text-[#f5f7fa]">New</option>
    <option value="reviewed" className="bg-[#03050a] text-[#f5f7fa]">Reviewed</option>
    <option value="replied" className="bg-[#03050a] text-[#f5f7fa]">Replied</option>
    <option value="archived" className="bg-[#03050a] text-[#f5f7fa]">Archived</option>
  </select>
);

const DashboardContent = ({ onLoggedOut }: { onLoggedOut: () => void }) => {
  const [tab, setTab] = useState<"contact" | "newsletter">("contact");
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [contactRes, newsletterRes] = await Promise.all([
      fetch("/api/admin/contact-submissions"),
      fetch("/api/admin/newsletter-subscriptions"),
    ]);
    if (contactRes.ok) setSubmissions(await contactRes.json());
    if (newsletterRes.ok) setSubscriptions(await newsletterRes.json());
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, status: SubmissionStatus) => {
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    await fetch(`/api/admin/contact-submissions/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    onLoggedOut();
  };

  return (
    <div className="min-h-screen w-full bg-[#03050a] px-6 py-16 text-[#f5f7fa] sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="[font-family:'JetBrains_Mono',Helvetica] text-[10.5px] tracking-[2px] text-[#f5f7fa55] uppercase">
              Lux Studio
            </p>
            <h1 className="mt-2 [font-family:'Bricolage_Grotesque',Helvetica] text-[32px] font-medium">Dashboard</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-white/[0.14] bg-white/[0.05] px-5 py-2.5 [font-family:'Inter',Helvetica] text-[13.5px] font-medium text-[#f5f7fa] transition-colors hover:bg-white/[0.09]"
          >
            Log out
          </button>
        </div>

        <div className="flex gap-2">
          {(["contact", "newsletter"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full border px-4 py-2 [font-family:'Inter',Helvetica] text-[13.5px] font-medium transition-colors ${
                tab === t
                  ? "border-[#38bdf850] bg-[#38bdf815] text-[#7dd3fc]"
                  : "border-white/[0.12] bg-transparent text-[#f5f7fa80] hover:bg-white/[0.04]"
              }`}
            >
              {t === "contact" ? `Contact & Project Requests (${submissions.length})` : `Newsletter Subscriptions (${subscriptions.length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="[font-family:'Inter',Helvetica] text-[14px] text-[#f5f7fa80]">Loading…</p>
        ) : tab === "contact" ? (
          submissions.length === 0 ? (
            <p className="[font-family:'Inter',Helvetica] text-[14px] text-[#f5f7fa80]">No submissions yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {submissions.map((s) => (
                <div key={s.id} className="rounded-[20px] border border-white/[0.11] bg-white/[0.03] p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="[font-family:'Bricolage_Grotesque',Helvetica] text-[18px] font-medium">{s.name}</p>
                      <p className="mt-0.5 [font-family:'Inter',Helvetica] text-[13.5px] text-[#f5f7fa80]">{s.contact}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="[font-family:'Inter',Helvetica] text-[12.5px] text-[#f5f7fa60]">{formatDate(s.createdAt)}</span>
                      <StatusSelect submission={s} onChange={handleStatusChange} />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 [font-family:'Inter',Helvetica] text-[12.5px] text-[#f5f7fa80]">
                    {s.company && <span className="rounded-full border border-white/10 px-3 py-1">Company: {s.company}</span>}
                    {s.projectType && <span className="rounded-full border border-white/10 px-3 py-1">Type: {s.projectType}</span>}
                    {s.budget && <span className="rounded-full border border-white/10 px-3 py-1">Budget: {s.budget}</span>}
                    {s.timeline && <span className="rounded-full border border-white/10 px-3 py-1">Timeline: {s.timeline}</span>}
                  </div>
                  <p className="mt-4 whitespace-pre-wrap [font-family:'Inter',Helvetica] text-[14px] leading-[24px] text-[#f5f7fac7]">{s.message}</p>
                </div>
              ))}
            </div>
          )
        ) : subscriptions.length === 0 ? (
          <p className="[font-family:'Inter',Helvetica] text-[14px] text-[#f5f7fa80]">No subscriptions yet.</p>
        ) : (
          <div className="overflow-hidden rounded-[20px] border border-white/[0.11]">
            <table className="w-full [font-family:'Inter',Helvetica] text-[14px]">
              <thead>
                <tr className="border-b border-white/[0.11] text-left text-[12.5px] uppercase tracking-[0.6px] text-[#f5f7fa60]">
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Source</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="border-b border-white/[0.06] last:border-b-0">
                    <td className="px-5 py-3">{sub.email}</td>
                    <td className="px-5 py-3 text-[#f5f7fa80]">{sub.name || "-"}</td>
                    <td className="px-5 py-3 text-[#f5f7fa80]">{sub.source || "-"}</td>
                    <td className="px-5 py-3 text-[#f5f7fa80]">{sub.status}</td>
                    <td className="px-5 py-3 text-[#f5f7fa60]">{formatDate(sub.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export const DashboardPage = (): JSX.Element => {
  useSEO(pageMeta.dashboard);
  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => res.json())
      .then((data) => setAuthenticated(Boolean(data.authenticated)))
      .catch(() => setAuthenticated(false))
      .finally(() => setChecked(true));
  }, []);

  if (!checked) {
    return <div className="min-h-screen w-full bg-[#03050a]" />;
  }

  if (!authenticated) {
    return <LoginScreen onSuccess={() => setAuthenticated(true)} />;
  }

  return <DashboardContent onLoggedOut={() => setAuthenticated(false)} />;
};
