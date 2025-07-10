
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Zap, Shield, Settings } from "lucide-react";

export function AIConfiguration() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Features
          </CardTitle>
          <CardDescription>
            Configure AI-powered features and capabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>GPT-Powered Insights</Label>
                <p className="text-sm text-muted-foreground">Enable AI-generated insights and summaries</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Summary Generation</Label>
                <p className="text-sm text-muted-foreground">Automatically generate report summaries</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Natural Language Queries</Label>
                <p className="text-sm text-muted-foreground">Convert natural language to SQL queries</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Anomaly Detection AI</Label>
                <p className="text-sm text-muted-foreground">Use machine learning for anomaly detection</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Predictive Analytics</Label>
                <p className="text-sm text-muted-foreground">Enable trend forecasting and predictions</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Model Configuration
            </CardTitle>
            <CardDescription>
              Fine-tune AI model parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>GPT Model</Label>
              <Select defaultValue="gpt-4">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4 (Recommended)</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude">Claude 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Response Creativity</Label>
              <div className="px-3">
                <Slider
                  defaultValue={[0.7]}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Conservative</span>
                  <span>Creative</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Max Tokens</Label>
              <div className="px-3">
                <Slider
                  defaultValue={[1000]}
                  max={4000}
                  min={100}
                  step={100}
                  className="w-full"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Current: 1000 tokens
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Context Window</Label>
              <Select defaultValue="8k">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4k">4K tokens</SelectItem>
                  <SelectItem value="8k">8K tokens</SelectItem>
                  <SelectItem value="16k">16K tokens</SelectItem>
                  <SelectItem value="32k">32K tokens</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Safety & Privacy
            </CardTitle>
            <CardDescription>
              Configure AI safety and data privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Data Anonymization</Label>
                <p className="text-sm text-muted-foreground">Remove PII before AI processing</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Content Filtering</Label>
                <p className="text-sm text-muted-foreground">Filter inappropriate AI responses</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Local Processing</Label>
                <p className="text-sm text-muted-foreground">Process sensitive data locally when possible</p>
              </div>
              <Switch />
            </div>

            <div className="space-y-2">
              <Label>Data Retention</Label>
              <Select defaultValue="30d">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 days</SelectItem>
                  <SelectItem value="30d">30 days</SelectItem>
                  <SelectItem value="90d">90 days</SelectItem>
                  <SelectItem value="never">Never delete</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-3 bg-muted rounded">
              <h4 className="font-medium mb-2">Usage Statistics</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>API Calls Today</span>
                  <span>1,247</span>
                </div>
                <div className="flex justify-between">
                  <span>Tokens Used</span>
                  <span>45,392</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Limit</span>
                  <span>100,000</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
