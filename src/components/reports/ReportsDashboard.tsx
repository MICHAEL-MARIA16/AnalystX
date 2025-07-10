
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportBuilder } from "./ReportBuilder";
import { ReportScheduler } from "./ReportScheduler";
import { ReportHistory } from "./ReportHistory";
import { ReportBranding } from "./ReportBranding";

export function ReportsDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Create, schedule, and manage automated reports
        </p>
      </div>

      <Tabs defaultValue="builder" className="space-y-4">
        <TabsList>
          <TabsTrigger value="builder">Report Builder</TabsTrigger>
          <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="builder">
          <ReportBuilder />
        </TabsContent>

        <TabsContent value="scheduler">
          <ReportScheduler />
        </TabsContent>

        <TabsContent value="history">
          <ReportHistory />
        </TabsContent>

        <TabsContent value="branding">
          <ReportBranding />
        </TabsContent>
      </Tabs>
    </div>
  );
}
