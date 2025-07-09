
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { QueryBuilder } from "@/components/query/QueryBuilder";
import { SavedQueries } from "@/components/query/SavedQueries";

const QueryAssistant = () => {
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
                <h1 className="text-lg font-semibold">Query Assistant</h1>
                <p className="text-sm text-muted-foreground">Build and execute natural language queries with AI assistance</p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6 space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Query Builder - Takes 2/3 width on xl screens */}
              <div className="xl:col-span-2">
                <QueryBuilder />
              </div>
              
              {/* Saved Queries - Takes 1/3 width on xl screens */}
              <div>
                <SavedQueries />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default QueryAssistant;
