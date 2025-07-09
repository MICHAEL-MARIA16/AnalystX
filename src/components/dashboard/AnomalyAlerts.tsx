
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingDown, TrendingUp, X } from "lucide-react";

const anomalies = [
  {
    id: 1,
    type: "Critical",
    title: "Unusual drop in conversion rate",
    description: "Conversion rate dropped by 25% in the last 24 hours",
    severity: "high",
    timestamp: "2 hours ago",
    metric: "Conversion Rate",
    change: "-25%"
  },
  {
    id: 2,
    type: "Warning",
    title: "Revenue spike detected",
    description: "Revenue increased by 40% compared to typical daily average",
    severity: "medium",
    timestamp: "4 hours ago",
    metric: "Daily Revenue",
    change: "+40%"
  }
];

export function AnomalyAlerts() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getTrendIcon = (change: string) => {
    return change.startsWith('+') ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (change: string) => {
    return change.startsWith('+') ? 'text-green-600' : 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Anomaly Detection
        </CardTitle>
        <CardDescription>
          Real-time alerts for unusual patterns in your data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {anomalies.map((anomaly) => {
            const TrendIcon = getTrendIcon(anomaly.change);
            const trendColor = getTrendColor(anomaly.change);
            
            return (
              <div key={anomaly.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <AlertTriangle className={`h-4 w-4 mt-0.5 ${anomaly.severity === 'high' ? 'text-red-500' : 'text-orange-500'}`} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{anomaly.title}</span>
                    <Badge variant={getSeverityColor(anomaly.severity) as any} className="text-xs">
                      {anomaly.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{anomaly.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">{anomaly.metric}:</span>
                    <div className="flex items-center gap-1">
                      <TrendIcon className={`h-3 w-3 ${trendColor}`} />
                      <span className={trendColor}>{anomaly.change}</span>
                    </div>
                    <span className="text-muted-foreground">• {anomaly.timestamp}</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
