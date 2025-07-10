
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AnomalyDashboard } from "@/components/anomaly/AnomalyDashboard";

const AnomalyDetection = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Anomaly Detection</h1>
                <p className="text-sm text-muted-foreground">AI-powered monitoring and alerting for unusual patterns</p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <AnomalyDashboard />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AnomalyDetection;
