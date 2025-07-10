
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MessageSquare, Smartphone, Calendar, Bell } from "lucide-react";

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground">Configure how and when you receive anomaly alerts</p>
      </div>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <CardTitle>Email Notifications</CardTitle>
          </div>
          <CardDescription>Receive alerts via email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Email Alerts</Label>
              <p className="text-sm text-muted-foreground">Send anomaly notifications to your email</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="space-y-2">
            <Label>Email Addresses</Label>
            <Input placeholder="admin@company.com, analyst@company.com" />
          </div>
          <div className="space-y-2">
            <Label>Minimum Severity</Label>
            <Select defaultValue="warning">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Info and above</SelectItem>
                <SelectItem value="warning">Warning and above</SelectItem>
                <SelectItem value="critical">Critical only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Slack Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <CardTitle>Slack Integration</CardTitle>
          </div>
          <CardDescription>Send alerts to Slack channels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Slack Alerts</Label>
              <p className="text-sm text-muted-foreground">Post notifications to Slack channels</p>
            </div>
            <Switch />
          </div>
          <div className="space-y-2">
            <Label>Webhook URL</Label>
            <Input placeholder="https://hooks.slack.com/services/..." />
          </div>
          <div className="space-y-2">
            <Label>Channel</Label>
            <Input placeholder="#alerts" />
          </div>
          <Button variant="outline" size="sm">Test Connection</Button>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            <CardTitle>Push Notifications</CardTitle>
          </div>
          <CardDescription>Mobile and browser notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive real-time alerts on your devices</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Quiet Hours</Label>
              <p className="text-sm text-muted-foreground">No notifications during these hours</p>
            </div>
            <div className="flex items-center gap-2">
              <Input className="w-20" placeholder="22:00" />
              <span>to</span>
              <Input className="w-20" placeholder="08:00" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <CardTitle>Weekly Summary Reports</CardTitle>
          </div>
          <CardDescription>Automated anomaly summary reports</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Weekly Reports</Label>
              <p className="text-sm text-muted-foreground">Get a summary of all anomalies from the past week</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Delivery Day</Label>
              <Select defaultValue="monday">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="tuesday">Tuesday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Delivery Time</Label>
              <Input type="time" defaultValue="09:00" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
