
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KPIFilters } from "./KPIFilters";
import { KPIGrid } from "./KPIGrid";
import { MetricBuilder } from "./MetricBuilder";
import { ChartWorkspace } from "./ChartWorkspace";
import { SavedTemplates } from "./SavedTemplates";

export function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [filters, setFilters] = useState({
    timeRange: "30d",
    region: "all",
    category: "all"
  });

  return (
    <div className="p-6 space-y-6">
      {/* Global Filters */}
      <KPIFilters filters={filters} onFiltersChange={setFilters} />

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Custom Metrics</TabsTrigger>
          <TabsTrigger value="charts">Chart Builder</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <KPIGrid filters={filters} />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <MetricBuilder />
        </TabsContent>

        <TabsContent value="charts" className="space-y-6">
          <ChartWorkspace filters={filters} />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <SavedTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
}
