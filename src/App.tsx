import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import InteractionChecker from "./pages/InteractionChecker";
import DrugDatabase from "./pages/DrugDatabase";
import ApiAccess from "./pages/ApiAccess";
import Documentation from "./pages/Documentation";
import ResearchPapers from "./pages/ResearchPapers";
import ClinicalGuidelines from "./pages/ClinicalGuidelines";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransition";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<PageTransition><Index /></PageTransition>} />
            <Route path="/checker" element={<PageTransition><InteractionChecker /></PageTransition>} />
            <Route path="/drugs" element={<PageTransition><DrugDatabase /></PageTransition>} />
            <Route path="/api" element={<PageTransition><ApiAccess /></PageTransition>} />
            <Route path="/docs" element={<PageTransition><Documentation /></PageTransition>} />
            <Route path="/research" element={<PageTransition><ResearchPapers /></PageTransition>} />
            <Route path="/guidelines" element={<PageTransition><ClinicalGuidelines /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
