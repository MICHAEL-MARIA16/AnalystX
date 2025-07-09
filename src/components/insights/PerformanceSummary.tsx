
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, TrendingDown, RefreshCw, Download } from "lucide-react";

const summaryData = {
  overallScore: 85,
  timeframe: "Last 30 days",
  keyMetrics: [
    { name: "Revenue Growth", value: "+12.5%", trend: "up", confidence: 92 },
    { name: "User Acquisition", value: "+8.3%", trend: "up", confidence: 88 },
    { name: "Customer Retention", value: "-2.1%", trend: "down", confidence: 76 },
    { name: "Conversion Rate", value: "+15.7%", trend: "up", confidence: 94 }
  ],
  aiSummary: "Your business performance has been strong this month with revenue growing 12.5% driven primarily by improved conversion rates and successful user acquisition campaigns. However, customer retention has slightly declined, suggesting a need to focus on engagement strategies for existing customers."
};

export function PerformanceSummary() {
  return (
    <div className="space-y-6">
      {/* AI-Generated Summary Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <CardTitle>AI Performance Summary</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Score: {summaryData.overallScore}/100</Badge>
              <Button size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
          <CardDescription>{summaryData.timeframe}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed mb-4">{summaryData.aiSummary}</p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-1" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
              <div className="mt-2">
                <Badge variant="outline" className="text-xs">
                  {metric.confidence}% confidence
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
