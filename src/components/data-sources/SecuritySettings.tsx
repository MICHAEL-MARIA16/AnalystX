import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Key, Shield, Eye, EyeOff, Trash2, Plus } from "lucide-react";

const apiKeys = [
  {
    id: 1,
    name: "BigQuery Service Account",
    type: "google_service_account",
    created: "2024-01-10",
    lastUsed: "2024-01-15",
    status: "active"
  },
  {
    id: 2,
    name: "PostgreSQL Credentials",
    type: "database_password",
    created: "2024-01-05",
    lastUsed: "2024-01-15",
    status: "active"
  },
  {
    id: 3,
    name: "Sheets OAuth Token",
    type: "oauth_token",
    created: "2024-01-12",
    lastUsed: "2024-01-14",
    status: "expired"
  }
];

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Security & API Keys</h3>
        <p className="text-sm text-muted-foreground">Manage secure credentials and access tokens for your data sources</p>
      </div>

      {/* Add New API Key */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            <CardTitle>Add New Credential</CardTitle>
          </div>
          <CardDescription>Securely store API keys and connection credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Credential Name</Label>
              <Input placeholder="e.g., Production DB Password" />
            </div>
            <div className="space-y-2">
              <Label>Credential Type</Label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option value="api_key">API Key</option>
                <option value="database_password">Database Password</option>
                <option value="oauth_token">OAuth Token</option>
                <option value="service_account">Service Account JSON</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Credential Value</Label>
            <Input type="password" placeholder="Enter your credential securely" />
          </div>
          <div className="flex items-center gap-2">
            <Switch />
            <Label>Enable automatic rotation (if supported)</Label>
          </div>
          <Button>Save Credential</Button>
        </CardContent>
      </Card>

      {/* Existing Credentials */}
      <div className="space-y-4">
        <h4 className="font-medium">Stored Credentials</h4>
        {apiKeys.map((key) => (
          <Card key={key.id}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    <h4 className="font-medium">{key.name}</h4>
                    <Badge variant={key.status === 'active' ? 'default' : 'destructive'}>
                      {key.status}
                    </Badge>
                    <Badge variant="outline">{key.type.replace('_', ' ')}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Created: {key.created}</span>
                    <span>Last Used: {key.lastUsed}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
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

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Security Preferences</CardTitle>
          </div>
          <CardDescription>Configure security policies for data access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Require 2FA for credential access</Label>
              <p className="text-sm text-muted-foreground">Additional verification when viewing or editing credentials</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-expire unused credentials</Label>
              <p className="text-sm text-muted-foreground">Automatically disable credentials not used for 90 days</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Encrypt credentials at rest</Label>
              <p className="text-sm text-muted-foreground">Use additional encryption for stored credentials</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>IP restrictions</Label>
              <p className="text-sm text-muted-foreground">Limit data source access to specific IP addresses</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Test Connections */}
      <Card>
        <CardHeader>
          <CardTitle>Test Connections</CardTitle>
          <CardDescription>Verify your credentials and test connections before saving</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Test Query</Label>
            <textarea 
              className="w-full px-3 py-2 border rounded-md h-24" 
              placeholder="SELECT COUNT(*) FROM users LIMIT 1;"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Test Query</Button>
            <Button variant="outline">Test Connection Only</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
