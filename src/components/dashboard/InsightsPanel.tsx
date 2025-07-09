
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Download, Share, TrendingUp } from "lucide-react";
import { QueryResult } from "./Dashboard";

interface InsightsPanelProps {
  result: QueryResult;
}

const recommendations = [
  "Consider increasing marketing spend in high-performing regions",
  "Implement retention strategies for segments showing decline",
  "Optimize pricing strategy based on conversion patterns",
];

export function InsightsPanel({ result }: InsightsPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          AI Insights
        </CardTitle>
        <CardDescription>
          Generated insights and recommendations based on your data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Analysis Summary</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {result.insights}
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Key Recommendations
          </h4>
          <div className="space-y-2">
            {recommendations.map((rec, index) => (
              <Badge key={index} variant="outline" className="text-xs py-1 px-2 w-full justify-start">
                {rec}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
