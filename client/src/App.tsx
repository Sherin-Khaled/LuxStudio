import { Switch, Route, useLocation } from "wouter";
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
import NotFound from "@/pages/not-found";

import { HomePage } from "@/pages/HomePage";
import { WorkPage } from "@/pages/WorkPage";
import { ServicesPage } from "@/pages/ServicesPage";
import { ProcessPage } from "@/pages/ProcessPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { DashboardPage } from "@/pages/DashboardPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/work" component={WorkPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/process" component={ProcessPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isDashboard = location === "/dashboard";

  return (
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
  );
}

export default App;
