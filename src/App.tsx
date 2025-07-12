
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/components/auth/AuthProvider";
import { LoginForm } from "@/components/auth/LoginForm";
import Index from "./pages/Index";
import Insights from "./pages/Insights";
import Analytics from "./pages/Analytics";
import AnomalyDetection from "./pages/AnomalyDetection";
import QueryAssistant from "./pages/QueryAssistant";
import DataSources from "./pages/DataSources";
import Reports from "./pages/Reports";
import Trends from "./pages/Trends";
import UserManagement from "./pages/UserManagement";
import SystemSettings from "./pages/SystemSettings";
import DataUpload from "./pages/DataUpload";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/anomaly-detection" element={<AnomalyDetection />} />
      <Route path="/query-assistant" element={<QueryAssistant />} />
      <Route path="/data-upload" element={<DataUpload />} />
      <Route path="/data-sources" element={<DataSources />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/trends" element={<Trends />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/system-settings" element={<SystemSettings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
