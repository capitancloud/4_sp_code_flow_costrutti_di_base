import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

// Fondamenti
import VariablesPage from "./pages/animations/VariablesPage";

// Selezione
import IfElsePage from "./pages/animations/IfElsePage";
import IfElseIfPage from "./pages/animations/IfElseIfPage";
import SwitchPage from "./pages/animations/SwitchPage";

// Iterazione
import ForLoopPage from "./pages/animations/ForLoopPage";

// Strutture Dati
import ArraysPage from "./pages/animations/ArraysPage";

// Astrazione
import FunctionsPage from "./pages/animations/FunctionsPage";

// Reattività
import EventsPage from "./pages/animations/EventsPage";

// Ordinamento
import BubbleSortPage from "./pages/animations/BubbleSortPage";

// Integrazione
import CompleteFlowPage from "./pages/animations/CompleteFlowPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Fondamenti */}
          <Route path="/animations/variables" element={<VariablesPage />} />
          
          {/* Selezione */}
          <Route path="/animations/if-else" element={<IfElsePage />} />
          <Route path="/animations/if-else-if" element={<IfElseIfPage />} />
          <Route path="/animations/switch" element={<SwitchPage />} />
          
          {/* Iterazione */}
          <Route path="/animations/for-loop" element={<ForLoopPage />} />
          
          {/* Strutture Dati */}
          <Route path="/animations/arrays" element={<ArraysPage />} />
          
          {/* Astrazione */}
          <Route path="/animations/functions" element={<FunctionsPage />} />
          
          {/* Reattività */}
          <Route path="/animations/events" element={<EventsPage />} />
          
          {/* Ordinamento */}
          <Route path="/animations/bubble-sort" element={<BubbleSortPage />} />
          
          {/* Integrazione */}
          <Route path="/animations/complete-flow" element={<CompleteFlowPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
