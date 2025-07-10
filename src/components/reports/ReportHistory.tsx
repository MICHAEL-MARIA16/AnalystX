
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Clock, FileText } from "lucide-react";

export function ReportHistory() {
  const reportHistory = [
    {
      id: "1",
      name: "Weekly Sales Report",
      generatedAt: "2024-01-07 09:00",
      format: "PDF",
      size: "2.3 MB",
      status: "completed",
      version: "v1.2"
    },
    {
      id: "2",
      name: "Monthly Analytics",
      generatedAt: "2024-01-01 08:00",
      format: "HTML",
      size: "1.8 MB",
      status: "completed",
      version: "v2.1"
    },
    {
      id: "3",
      name: "Daily KPIs",
      generatedAt: "2024-01-07 07:30",
      format: "Excel",
      size: "856 KB",
      status: "failed",
      version: "v1.0"
    },
    {
      id: "4",
      name: "Q4 Performance",
      generatedAt: "2024-01-01 10:00",
      format: "PDF",
      size: "4.7 MB",
      status: "completed",
      version: "v3.0"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "failed": return "destructive";
      case "processing": return "secondary";
      default: return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Report History
        </CardTitle>
        <CardDescription>
          View and download previously generated reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reportHistory.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">{report.name}</h4>
                  <div className="text-sm text-muted-foreground">
                    Generated: {report.generatedAt} • Size: {report.size} • {report.version}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={getStatusColor(report.status)}>
                  {report.status}
                </Badge>
                <Badge variant="outline">
                  {report.format}
                </Badge>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" disabled={report.status !== "completed"}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
