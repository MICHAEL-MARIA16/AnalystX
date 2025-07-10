
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, FileSpreadsheet, CheckCircle, AlertCircle, Settings, Trash2, RefreshCw } from "lucide-react";

const connections = [
  {
    id: 1,
    name: "Production PostgreSQL",
    type: "postgresql",
    status: "connected",
    lastSync: "2024-01-15 10:30",
    syncStatus: "success",
    tables: 12,
    queryable: true
  },
  {
    id: 2,
    name: "Sales Analytics BigQuery",
    type: "bigquery",
    status: "connected",
    lastSync: "2024-01-15 09:15",
    syncStatus: "success",
    tables: 8,
    queryable: true
  },
  {
    id: 3,
    name: "Customer Data Sheets",
    type: "sheets",
    status: "error",
    lastSync: "2024-01-14 16:20",
    syncStatus: "failed",
    tables: 1,
    queryable: false,
    error: "Authentication expired"
  },
  {
    id: 4,
    name: "MongoDB User Events",
    type: "mongodb",
    status: "syncing",
    lastSync: "In progress",
    syncStatus: "syncing",
    tables: 5,
    queryable: true
  }
];

export function ConnectionManager() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'syncing': return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sheets': return <FileSpreadsheet className="h-5 w-5" />;
      default: return <Database className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Active Connections</h3>
          <p className="text-sm text-muted-foreground">Manage your data source connections and sync settings</p>
        </div>
        <Button variant="outline">Refresh All</Button>
      </div>

      <div className="space-y-4">
        {connections.map((connection) => (
          <Card key={connection.id}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-3">
                  {getTypeIcon(connection.type)}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{connection.name}</h4>
                      {getStatusIcon(connection.status)}
                      <Badge variant="outline" className="text-xs">
                        {connection.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Tables: {connection.tables}</span>
                      <span>Last Sync: {connection.lastSync}</span>
                      {connection.error && (
                        <span className="text-red-600">Error: {connection.error}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Queryable</span>
                        <Switch checked={connection.queryable} />
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Tables</SelectItem>
                          <SelectItem value="selected">Selected Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table/Column Management */}
      <Card>
        <CardHeader>
          <CardTitle>Table & Column Access</CardTitle>
          <CardDescription>Control which tables and columns are available for querying</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a connection" />
              </SelectTrigger>
              <SelectContent>
                {connections.filter(c => c.status === 'connected').map(connection => (
                  <SelectItem key={connection.id} value={connection.id.toString()}>
                    {connection.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-4">Select tables and columns to make queryable:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch defaultChecked />
                  <span className="font-medium">users</span>
                  <Badge variant="outline">5 columns</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked />
                  <span className="font-medium">orders</span>
                  <Badge variant="outline">8 columns</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Switch />
                  <span className="font-medium">audit_logs</span>
                  <Badge variant="outline">12 columns</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
