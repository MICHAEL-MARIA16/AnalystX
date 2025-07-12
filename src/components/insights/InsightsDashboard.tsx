
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PerformanceSummary } from "./PerformanceSummary";
import { ChangeDetection } from "./ChangeDetection";
import { ActionSuggestions } from "./ActionSuggestions";
import { DomainInsights } from "./DomainInsights";

export function InsightsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="p-6 space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Performance Overview</TabsTrigger>
          <TabsTrigger value="changes">What Changed?</TabsTrigger>
          <TabsTrigger value="actions">Suggested Actions</TabsTrigger>
          <TabsTrigger value="domains">By Domain</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <PerformanceSummary />
        </TabsContent>

        <TabsContent value="changes" className="space-y-6">
          <ChangeDetection />
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <ActionSuggestions />
        </TabsContent>

        <TabsContent value="domains" className="space-y-6">
          <DomainInsights />
        </TabsContent>
      </Tabs>
    </div>
  );
}
