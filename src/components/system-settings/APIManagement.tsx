
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff, Key, Plus, Trash2 } from "lucide-react";

export function APIManagement() {
  const [showKeys, setShowKeys] = useState<{[key: string]: boolean}>({});

  const apiKeys = [
    {
      id: "1",
      name: "OpenAI API Key",
      description: "For AI-powered insights and GPT features",
      value: "sk-proj-abc123...xyz789",
      lastUsed: "2024-01-07 14:30",
      status: "active"
    },
    {
      id: "2", 
      name: "Slack Webhook",
      description: "For sending notifications to Slack channels",
      value: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
      lastUsed: "2024-01-07 10:15",
      status: "active"
    },
    {
      id: "3",
      name: "SendGrid API Key", 
      description: "For email delivery and notifications",
      value: "SG.abc123...xyz789",
      lastUsed: "2024-01-06 16:45",
      status: "inactive"
    }
  ];

  const environments = [
    { name: "Production", description: "Live environment" },
    { name: "Staging", description: "Testing environment" },
    { name: "Development", description: "Development environment" }
  ];

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const maskValue = (value: string) => {
    if (value.startsWith('sk-')) {
      return value.substring(0, 7) + '...';
    }
    if (value.startsWith('https://')) {
      return value.substring(0, 20) + '...';
    }
    return value.substring(0, 8) + '...';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys & Tokens
          </CardTitle>
          <CardDescription>
            Manage API keys and external service integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((key) => (
              <div key={key.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{key.name}</h4>
                    <p className="text-sm text-muted-foreground">{key.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={key.status === "active" ? "default" : "secondary"}>
                      {key.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleKeyVisibility(key.id)}
                    >
                      {showKeys[key.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>API Key / Token</Label>
                  <div className="flex gap-2">
                    <Input 
                      type={showKeys[key.id] ? "text" : "password"}
                      value={showKeys[key.id] ? key.value : maskValue(key.value)}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button size="sm" variant="outline">Copy</Button>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Last used: {key.lastUsed}
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add New API Key
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>
              Configure environment-specific settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Environment</Label>
              <select className="w-full p-2 border rounded">
                {environments.map((env, index) => (
                  <option key={index} value={env.name.toLowerCase()}>
                    {env.name} - {env.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Variable Name</Label>
              <Input placeholder="CUSTOM_API_ENDPOINT" />
            </div>

            <div className="space-y-2">
              <Label>Variable Value</Label>
              <Textarea placeholder="Enter the value for this environment variable" />
            </div>

            <Button className="w-full">Add Variable</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuration Test</CardTitle>
            <CardDescription>
              Test your API connections and configurations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Test OpenAI Connection
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Test Slack Integration
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Test Email Service
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Test Database Connections
              </Button>
            </div>

            <div className="p-3 bg-muted rounded">
              <h4 className="font-medium mb-2">Connection Status</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>OpenAI API</span>
                  <Badge variant="default">Connected</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Slack</span>
                  <Badge variant="default">Connected</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Email Service</span>
                  <Badge variant="secondary">Disconnected</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
