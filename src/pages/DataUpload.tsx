import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DataUploadDashboard } from "@/components/data-upload/DataUploadDashboard";

export default function DataUpload() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Data Upload</h1>
                <p className="text-sm text-muted-foreground">Upload your data files to generate AI insights</p>
              </div>
            </div>
          </header>
          <DataUploadDashboard />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}