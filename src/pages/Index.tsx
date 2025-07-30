
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";

export default function Index() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1 p-0">
          <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-lg font-semibold">AnalystX Dashboard</h1>
                <p className="text-sm text-muted-foreground">AI-powered data insights from your uploaded data</p>
              </div>
            </div>
          </header>
          <div className="p-0">
            <Dashboard />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
