
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, RefreshCw, AlertCircle, Info, AlertTriangle, XCircle } from "lucide-react";

export function SystemLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [logLevel, setLogLevel] = useState("all");

  const logs = [
    {
      id: "1",
      timestamp: "2024-01-07 14:35:22",
      level: "error",
      source: "Database Connection",
      message: "Connection timeout to PostgreSQL instance",
      details: "Connection attempt failed after 30 seconds"
    },
    {
      id: "2",
      timestamp: "2024-01-07 14:30:15", 
      level: "warning",
      source: "API Rate Limit",
      message: "OpenAI API rate limit approaching",
      details: "85% of hourly quota used"
    },
    {
      id: "3",
      timestamp: "2024-01-07 14:25:08",
      level: "info",
      source: "User Authentication",
      message: "User login successful",
      details: "User: alice@company.com from IP: 192.168.1.100"
    },
    {
      id: "4",
      timestamp: "2024-01-07 14:20:33",
      level: "info",
      source: "Report Generation",
      message: "Monthly report generated successfully",
      details: "Report ID: RPT-2024-001, Size: 2.3MB"
    },
    {
      id: "5",
      timestamp: "2024-01-07 14:15:45",
      level: "critical",
      source: "System Security",
      message: "Multiple failed login attempts detected",
      details: "5 consecutive failures from IP: 203.0.113.45"
    }
  ];

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "critical": return <XCircle className="h-4 w-4 text-red-500" />;
      case "error": return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "info": return <Info className="h-4 w-4 text-blue-500" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "critical": return "destructive";
      case "error": return "destructive";
      case "warning": return "secondary";
      case "info": return "outline";
      default: return "outline";
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = logLevel === "all" || log.level === logLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={logLevel} onValueChange={setLogLevel}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="info">Info</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>

        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Critical Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-500">3</span>
              <XCircle className="h-4 w-4 text-red-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-500">12</span>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-yellow-500">45</span>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">1,247</span>
              <Info className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Logs</CardTitle>
          <CardDescription>
            Real-time system events and error tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="mt-0.5">
                  {getLevelIcon(log.level)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{log.message}</span>
                    <Badge variant={getLevelColor(log.level)}>
                      {log.level}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>
                      <span className="font-medium">Source:</span> {log.source}
                    </div>
                    <div>
                      <span className="font-medium">Details:</span> {log.details}
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {log.timestamp}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
