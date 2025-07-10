
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Calendar, AlertCircle, Lightbulb } from "lucide-react";

export function TrendInsights() {
  const insights = [
    {
      type: "seasonality",
      title: "Strong Q4 Seasonality Detected",
      description: "Revenue consistently peaks in Q4, with an average 23% increase compared to Q3. This pattern has been consistent for the past 3 years.",
      confidence: "High",
      impact: "Major",
      recommendation: "Plan inventory and marketing campaigns to capitalize on Q4 surge."
    },
    {
      type: "decline",
      title: "Summer Dip Pattern",
      description: "A consistent 8-12% decline is observed during July-August period, likely due to vacation seasonality.",
      confidence: "Medium",
      impact: "Minor",
      recommendation: "Consider summer-specific promotions or focus on southern hemisphere markets."
    },
    {
      type: "growth",
      title: "Asia Market Acceleration",
      description: "Asian markets show exponential growth with 45% year-over-year increase. Growth rate is accelerating.",
      confidence: "High",
      impact: "Major",
      recommendation: "Increase investment in Asian market expansion and localization."
    },
    {
      type: "anomaly",
      title: "March 2023 Anomaly",
      description: "Unusual 15% drop in March 2023 breaks the seasonal pattern. External factors may have influenced this.",
      confidence: "Medium",
      impact: "Historical",
      recommendation: "Investigate external factors that caused the March anomaly."
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "seasonality": return <Calendar className="h-4 w-4" />;
      case "decline": return <TrendingUp className="h-4 w-4 rotate-180" />;
      case "growth": return <TrendingUp className="h-4 w-4" />;
      case "anomaly": return <AlertCircle className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "seasonality": return "blue";
      case "decline": return "red";
      case "growth": return "green";
      case "anomaly": return "orange";
      default: return "gray";
    }
  };

  const getConfidenceVariant = (confidence: string) => {
    switch (confidence) {
      case "High": return "default";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Trend Insights
          </CardTitle>
          <CardDescription>
            GPT analysis of patterns, seasonality, and anomalies in your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button size="sm">Refresh Analysis</Button>
            <Button size="sm" variant="outline">Export Summary</Button>
          </div>
          
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`text-${getTypeColor(insight.type)}-500`}>
                      {getTypeIcon(insight.type)}
                    </div>
                    <h4 className="font-medium">{insight.title}</h4>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getConfidenceVariant(insight.confidence)}>
                      {insight.confidence} Confidence
                    </Badge>
                    <Badge variant="outline">
                      {insight.impact} Impact
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {insight.description}
                </p>
                
                <div className="flex items-start gap-2 p-3 bg-muted rounded">
                  <Lightbulb className="h-4 w-4 mt-0.5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">Recommendation</p>
                    <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Seasonal Patterns</CardTitle>
            <CardDescription>Recurring trends identified</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Q4 Holiday Boost</span>
                <Badge variant="default">+23%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Summer Slowdown</span>
                <Badge variant="destructive">-10%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Back-to-School</span>
                <Badge variant="default">+8%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">New Year Dip</span>
                <Badge variant="secondary">-5%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Drivers</CardTitle>
            <CardDescription>Key factors influencing trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Market Expansion</span>
                <Badge variant="default">Primary</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Product Innovation</span>
                <Badge variant="default">Primary</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Economic Factors</span>
                <Badge variant="secondary">Secondary</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Competition</span>
                <Badge variant="outline">Minimal</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
