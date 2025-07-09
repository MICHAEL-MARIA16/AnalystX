
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { InsightsDashboard } from "@/components/insights/InsightsDashboard";

const Insights = () => {
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
                <h1 className="text-lg font-semibold">AI Insights</h1>
                <p className="text-sm text-muted-foreground">GPT-powered analysis and business intelligence</p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <InsightsDashboard />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Insights;
