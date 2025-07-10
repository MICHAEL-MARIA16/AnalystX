
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Pause, Calendar } from "lucide-react";

const schedules = [
  {
    id: 1,
    connection: "Production PostgreSQL",
    frequency: "hourly",
    nextRun: "2024-01-15 11:00",
    enabled: true,
    lastRun: "2024-01-15 10:00",
    status: "success"
  },
  {
    id: 2,
    connection: "Sales Analytics BigQuery",
    frequency: "daily",
    nextRun: "2024-01-16 02:00",
    enabled: true,
    lastRun: "2024-01-15 02:00",
    status: "success"
  },
  {
    id: 3,
    connection: "Customer Data Sheets",
    frequency: "weekly",
    nextRun: "2024-01-22 08:00",
    enabled: false,
    lastRun: "2024-01-08 08:00",
    status: "failed"
  }
];

export function SyncScheduler() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Sync Scheduling</h3>
        <p className="text-sm text-muted-foreground">Configure automatic data synchronization schedules</p>
      </div>

      {/* Current Schedules */}
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <Card key={schedule.id}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{schedule.connection}</h4>
                    <Badge variant={schedule.frequency === 'hourly' ? 'default' : schedule.frequency === 'daily' ? 'secondary' : 'outline'}>
                      {schedule.frequency}
                    </Badge>
                    <Badge variant={schedule.status === 'success' ? 'default' : 'destructive'}>
                      {schedule.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Next Run: {schedule.nextRun}</span>
                    <span>Last Run: {schedule.lastRun}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={schedule.enabled} />
                  <Select defaultValue={schedule.frequency}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="outline">
                    {schedule.enabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Schedule Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <CardTitle>Advanced Scheduling</CardTitle>
          </div>
          <CardDescription>Configure custom sync schedules for optimal performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Data Source</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select connection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="postgresql">Production PostgreSQL</SelectItem>
                  <SelectItem value="bigquery">Sales Analytics BigQuery</SelectItem>
                  <SelectItem value="sheets">Customer Data Sheets</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Frequency</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15min">Every 15 minutes</SelectItem>
                  <SelectItem value="30min">Every 30 minutes</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Time</label>
              <input type="time" className="w-full px-3 py-2 border rounded-md" defaultValue="02:00" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Timezone</label>
              <Select defaultValue="utc">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern (EST)</SelectItem>
                  <SelectItem value="pst">Pacific (PST)</SelectItem>
                  <SelectItem value="cet">Central European (CET)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-4">
            <Button>Save Schedule</Button>
            <Button variant="outline">Test Sync Now</Button>
          </div>
        </CardContent>
      </Card>

      {/* Sync History */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <CardTitle>Sync History</CardTitle>
          </div>
          <CardDescription>View recent synchronization activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Production PostgreSQL</span>
                <Badge variant="default">Success</Badge>
              </div>
              <span className="text-sm text-muted-foreground">2024-01-15 10:00</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sales Analytics BigQuery</span>
                <Badge variant="default">Success</Badge>
              </div>
              <span className="text-sm text-muted-foreground">2024-01-15 02:00</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Customer Data Sheets</span>
                <Badge variant="destructive">Failed</Badge>
              </div>
              <span className="text-sm text-muted-foreground">2024-01-14 16:20</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
