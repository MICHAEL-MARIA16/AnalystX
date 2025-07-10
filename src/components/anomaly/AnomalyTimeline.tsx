
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, TrendingDown, TrendingUp, Calendar, Filter, Download } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const anomalyData = [
  {
    id: 1,
    timestamp: "2024-01-15 14:30",
    metric: "Revenue",
    severity: "critical",
    value: 125000,
    threshold: 100000,
    change: "+25%",
    description: "Unusual revenue spike detected",
    annotation: "Black Friday campaign launch"
  },
  {
    id: 2,
    timestamp: "2024-01-14 09:15",
    metric: "User Signups",
    severity: "warning",
    value: 45,
    threshold: 100,
    change: "-55%",
    description: "Signup rate below normal",
    annotation: "Weekend traffic pattern"
  },
  {
    id: 3,
    timestamp: "2024-01-13 16:45",
    metric: "API Response Time",
    severity: "critical",
    value: 2500,
    threshold: 500,
    change: "+400%",
    description: "Severe performance degradation",
    annotation: "Database connection issue"
  }
];

const chartData = [
  { time: "00:00", value: 85, threshold: 100 },
  { time: "04:00", value: 92, threshold: 100 },
  { time: "08:00", value: 78, threshold: 100 },
  { time: "12:00", value: 125, threshold: 100 }, // Anomaly
  { time: "16:00", value: 95, threshold: 100 },
  { time: "20:00", value: 88, threshold: 100 }
];

export function AnomalyTimeline() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select defaultValue="7d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            More Filters
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-1" />
            Schedule Report
          </Button>
        </div>
      </div>

      {/* Timeline Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Anomaly Timeline</CardTitle>
          <CardDescription>Visual representation of detected anomalies over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <ReferenceLine y={100} stroke="red" strokeDasharray="2 2" label="Threshold" />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Anomaly List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Anomalies</h3>
        {anomalyData.map((anomaly) => (
          <Card key={anomaly.id}>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`h-5 w-5 mt-0.5 ${anomaly.severity === 'critical' ? 'text-red-500' : 'text-orange-500'}`} />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{anomaly.description}</h4>
                      <Badge variant={getSeverityColor(anomaly.severity) as any}>
                        {anomaly.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Metric: {anomaly.metric}</span>
                      <span>Value: {anomaly.value.toLocaleString()}</span>
                      <span>Change: {anomaly.change}</span>
                      <span>Time: {anomaly.timestamp}</span>
                    </div>
                    {anomaly.annotation && (
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-muted-foreground">Auto-annotation:</span>
                        <span className="text-blue-600">{anomaly.annotation}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">Investigate</Button>
                  <Button size="sm" variant="outline">Mark Resolved</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
