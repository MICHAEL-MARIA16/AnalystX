
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Clock, Mail, MessageSquare, Calendar } from "lucide-react";

export function ReportScheduler() {
  const [frequency, setFrequency] = useState("weekly");
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [slackEnabled, setSlackEnabled] = useState(false);
  const [emailList, setEmailList] = useState("");

  const scheduledReports = [
    {
      id: "1",
      name: "Weekly Sales Report",
      frequency: "Weekly",
      nextRun: "2024-01-15 09:00",
      status: "active",
      recipients: 5
    },
    {
      id: "2",
      name: "Monthly Analytics",
      frequency: "Monthly",
      nextRun: "2024-02-01 08:00",
      status: "active",
      recipients: 12
    },
    {
      id: "3",
      name: "Daily KPIs",
      frequency: "Daily",
      nextRun: "2024-01-08 07:30",
      status: "paused",
      recipients: 3
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Schedule Configuration
          </CardTitle>
          <CardDescription>
            Set up automated report delivery
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <Label>Email Delivery</Label>
              </div>
              <Switch
                checked={emailEnabled}
                onCheckedChange={setEmailEnabled}
              />
            </div>

            {emailEnabled && (
              <div className="space-y-2">
                <Label htmlFor="email-list">Email Recipients</Label>
                <Input
                  id="email-list"
                  placeholder="email1@company.com, email2@company.com"
                  value={emailList}
                  onChange={(e) => setEmailList(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <Label>Slack Integration</Label>
            </div>
            <Switch
              checked={slackEnabled}
              onCheckedChange={setSlackEnabled}
            />
          </div>

          <Button className="w-full">
            <Calendar className="h-4 w-4 mr-2" />
            Save Schedule
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Schedules</CardTitle>
          <CardDescription>
            Manage your scheduled reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledReports.map((report) => (
              <div key={report.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{report.name}</h4>
                  <Badge variant={report.status === "active" ? "default" : "secondary"}>
                    {report.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div>Frequency: {report.frequency}</div>
                  <div>Next run: {report.nextRun}</div>
                  <div>Recipients: {report.recipients}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline">Pause</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
