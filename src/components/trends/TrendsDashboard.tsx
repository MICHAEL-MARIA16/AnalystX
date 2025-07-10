
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendAnalysis } from "./TrendAnalysis";
import { TrendComparison } from "./TrendComparison";
import { TrendInsights } from "./TrendInsights";
import { TrendExport } from "./TrendExport";

export function TrendsDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trends</h1>
        <p className="text-muted-foreground">
          Analyze long-term patterns and seasonal trends
        </p>
      </div>

      <Tabs defaultValue="analysis" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analysis">Trend Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis">
          <TrendAnalysis />
        </TabsContent>

        <TabsContent value="comparison">
          <TrendComparison />
        </TabsContent>

        <TabsContent value="insights">
          <TrendInsights />
        </TabsContent>

        <TabsContent value="export">
          <TrendExport />
        </TabsContent>
      </Tabs>
    </div>
  );
}
