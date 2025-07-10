
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText, Users, Download, Settings, AlertTriangle } from "lucide-react";

export function AuditLog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const auditEntries = [
    {
      id: "1",
      timestamp: "2024-01-07 14:35:22",
      user: "Alice Johnson",
      action: "Created Report",
      resource: "Monthly Revenue Analysis",
      details: "Generated new report with Q4 data",
      severity: "info"
    },
    {
      id: "2", 
      timestamp: "2024-01-07 14:30:15",
      user: "Bob Smith",
      action: "Exported Data",
      resource: "Customer Database",
      details: "Downloaded 500 customer records as CSV",
      severity: "warning"
    },
    {
      id: "3",
      timestamp: "2024-01-07 14:25:08",
      user: "Alice Johnson", 
      action: "User Role Changed",
      resource: "Carol Davis",
      details: "Changed role from Viewer to Analyst",
      severity: "high"
    },
    {
      id: "4",
      timestamp: "2024-01-07 14:20:33",
      user: "David Wilson",
      action: "Query Executed",
      resource: "Sales Database",
      details: "SELECT * FROM sales WHERE date > '2024-01-01'",
      severity: "info"
    },
    {
      id: "5",
      timestamp: "2024-01-07 14:15:45",
      user: "System",
      action: "Failed Login",
      resource: "unknown@company.com",
      details: "Multiple failed login attempts detected",
      severity: "critical"
    }
  ];

  const getActionIcon = (action: string) => {
    if (action.includes("Report")) return <FileText className="h-4 w-4" />;
    if (action.includes("User") || action.includes("Role")) return <Users className="h-4 w-4" />;
    if (action.includes("Export") || action.includes("Download")) return <Download className="h-4 w-4" />;
    if (action.includes("Settings")) return <Settings className="h-4 w-4" />;
    if (action.includes("Failed") || action.includes("Error")) return <AlertTriangle className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "high": return "destructive"; 
      case "warning": return "secondary";
      case "info": return "outline";
      default: return "outline";
    }
  };

  const filteredEntries = auditEntries.filter(entry => {
    const matchesSearch = entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === "all" || 
                         entry.action.toLowerCase().includes(actionFilter.toLowerCase());
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search audit logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="report">Report Actions</SelectItem>
            <SelectItem value="user">User Actions</SelectItem>
            <SelectItem value="export">Export Actions</SelectItem>
            <SelectItem value="login">Login Events</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Audit Log</CardTitle>
          <CardDescription>
            Complete record of user actions and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="mt-0.5">
                  {getActionIcon(entry.action)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{entry.action}</span>
                    <Badge variant={getSeverityColor(entry.severity)}>
                      {entry.severity}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>
                      <span className="font-medium">User:</span> {entry.user}
                    </div>
                    <div>
                      <span className="font-medium">Resource:</span> {entry.resource}
                    </div>
                    <div>
                      <span className="font-medium">Details:</span> {entry.details}
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {entry.timestamp}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
