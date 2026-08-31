import { lazy, Suspense } from "react";
import { Router as WouterRouter, Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CosmicRevealBackground } from "@/components/backgrounds/CosmicRevealBackground";
import { ScrollRefreshManager } from "@/components/ScrollRefreshManager";
import { ProjectModalProvider } from "@/contexts/ProjectModalContext";
import { ProjectRequestModal } from "@/components/ProjectRequestModal";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useJSONLD } from "@/lib/seo/useJSONLD";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/seo/schema";
import NotFound from "@/pages/not-found";

// Route-level code splitting: each public page (plus /dashboard, the one
// route a public marketing visitor never needs) becomes its own chunk
// instead of all nine sitting in the single main bundle. Named exports
// throughout this codebase, not default, hence the `.then()` remap.
const HomePage = lazy(() => import("@/pages/HomePage").then((m) => ({ default: m.HomePage })));
const WorkPage = lazy(() => import("@/pages/WorkPage").then((m) => ({ default: m.WorkPage })));
const CaseStudyPage = lazy(() => import("@/pages/CaseStudyPage").then((m) => ({ default: m.CaseStudyPage })));
const ServicesPage = lazy(() => import("@/pages/ServicesPage").then((m) => ({ default: m.ServicesPage })));
const ProcessPage = lazy(() => import("@/pages/ProcessPage").then((m) => ({ default: m.ProcessPage })));
const AboutPage = lazy(() => import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import("@/pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const DashboardPage = lazy(() => import("@/pages/DashboardPage").then((m) => ({ default: m.DashboardPage })));

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/work" component={WorkPage} />
        <Route path="/work/:slug" component={CaseStudyPage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/process" component={ProcessPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function AppContent() {
  const [location] = useLocation();
  const isDashboard = location === "/dashboard";

  // Site-wide, present on every route (including /dashboard/404 — harmless,
  // since neither is prerendered or meant to be indexed anyway). No-ops
  // entirely until SITE_URL is confirmed — see lib/seo/schema.ts.
  useJSONLD("organization", buildOrganizationSchema());
  useJSONLD("website", buildWebSiteSchema());

  return (
    <LanguageProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ProjectModalProvider>
              <Toaster />
              <ScrollToTop />
              <ScrollRefreshManager />
              {!isDashboard && <CosmicRevealBackground />}
              {!isDashboard && <Navbar />}
              <Router />
              <ProjectRequestModal />
            </ProjectModalProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export interface AppProps {
  /** Explicit route used only by the browserless production prerenderer. */
  ssrPath?: string;
}

function App({ ssrPath }: AppProps) {
  return (
    <WouterRouter ssrPath={ssrPath}>
      <AppContent />
    </WouterRouter>
  );
}

export default App;
