
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, TrendingDown, Users, DollarSign, BarChart3 } from "lucide-react";

const changeData = [
  {
    id: 1,
    title: "Spike in Mobile Traffic",
    description: "Mobile users increased by 45% compared to last week",
    category: "User Behavior",
    severity: "high",
    confidence: 94,
    timeDetected: "2 hours ago",
    impact: "+$12,500 estimated revenue",
    icon: Users
  },
  {
    id: 2,
    title: "Drop in Email Open Rates",
    description: "Email engagement down 23% since Monday",
    category: "Marketing",
    severity: "medium",
    confidence: 87,
    timeDetected: "4 hours ago",
    impact: "-15% campaign effectiveness",
    icon: TrendingDown
  },
  {
    id: 3,
    title: "New Customer Segment Emerging",
    description: "25-34 age group showing 67% higher LTV",
    category: "Customer Analytics",
    severity: "low",
    confidence: 91,
    timeDetected: "1 day ago",
    impact: "New opportunity identified",
    icon: TrendingUp
  },
  {
    id: 4,
    title: "Weekend Sales Pattern Change",
    description: "Saturday sales now outperforming Friday by 31%",
    category: "Revenue",
    severity: "medium",
    confidence: 89,
    timeDetected: "2 days ago",
    impact: "+$8,200 weekend revenue",
    icon: DollarSign
  }
];

const severityColors = {
  high: "bg-red-50 border-red-200 text-red-700",
  medium: "bg-yellow-50 border-yellow-200 text-yellow-700",
  low: "bg-green-50 border-green-200 text-green-700"
};

export function ChangeDetection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recent Changes Detected</h3>
          <p className="text-sm text-muted-foreground">AI-powered analysis of shifts in your business metrics</p>
        </div>
        <Button variant="outline">
          <AlertTriangle className="h-4 w-4 mr-1" />
          Configure Alerts
        </Button>
      </div>

      <div className="grid gap-4">
        {changeData.map((change) => {
          const IconComponent = change.icon;
          return (
            <Card key={change.id} className={`border-l-4 ${severityColors[change.severity as keyof typeof severityColors]}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5" />
                    <CardTitle className="text-base">{change.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{change.confidence}% confidence</Badge>
                    <Badge variant={change.severity === "high" ? "destructive" : change.severity === "medium" ? "default" : "secondary"}>
                      {change.severity}
                    </Badge>
                  </div>
                </div>
                <CardDescription>{change.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">Category: {change.category}</span>
                    <span className="text-muted-foreground">Detected: {change.timeDetected}</span>
                  </div>
                  <span className="font-medium">{change.impact}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">Mark as Resolved</Button>
                  <Button size="sm" variant="outline">Snooze</Button>
                  <Button size="sm">Investigate</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
