
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DataUpload from "./pages/DataUpload";
import QueryAssistant from "./pages/QueryAssistant";
import Analytics from "./pages/Analytics";
import Insights from "./pages/Insights";
import AnomalyDetection from "./pages/AnomalyDetection";
import DataSources from "./pages/DataSources";
import Reports from "./pages/Reports";
import Trends from "./pages/Trends";
import UserManagement from "./pages/UserManagement";
import SystemSettings from "./pages/SystemSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/upload" element={<DataUpload />} />
          <Route path="/query" element={<QueryAssistant />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/anomalies" element={<AnomalyDetection />} />
          <Route path="/sources" element={<DataSources />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/settings" element={<SystemSettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
