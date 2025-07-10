import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings, Trash2, Brain } from "lucide-react";

const thresholds = [
  {
    id: 1,
    metric: "Revenue",
    type: "manual",
    minValue: 80000,
    maxValue: 120000,
    enabled: true,
    severity: "critical"
  },
  {
    id: 2,
    metric: "User Signups",
    type: "auto-ml",
    confidence: 85,
    enabled: true,
    severity: "warning"
  },
  {
    id: 3,
    metric: "API Response Time",
    type: "manual",
    maxValue: 500,
    enabled: false,
    severity: "critical"
  }
];

export function ThresholdManager() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">KPI Thresholds</h3>
          <p className="text-sm text-muted-foreground">Define manual thresholds or enable ML-based auto-learning</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Add Threshold
        </Button>
      </div>

      {/* Add New Threshold Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Threshold</CardTitle>
            <CardDescription>Configure anomaly detection for a KPI metric</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Metric Name</Label>
                <Input placeholder="e.g., Revenue, User Signups" />
              </div>
              <div className="space-y-2">
                <Label>Detection Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual Threshold</SelectItem>
                    <SelectItem value="auto-ml">Auto-learn with ML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Minimum Value (Optional)</Label>
                <Input type="number" placeholder="Lower bound" />
              </div>
              <div className="space-y-2">
                <Label>Maximum Value (Optional)</Label>
                <Input type="number" placeholder="Upper bound" />
              </div>
              <div className="space-y-2">
                <Label>Severity Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              <Button>Save Threshold</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Thresholds */}
      <div className="space-y-4">
        {thresholds.map((threshold) => (
          <Card key={threshold.id}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{threshold.metric}</h4>
                    <Badge variant={threshold.type === 'auto-ml' ? 'default' : 'outline'}>
                      {threshold.type === 'auto-ml' ? (
                        <><Brain className="h-3 w-3 mr-1" />ML-based</>
                      ) : (
                        'Manual'
                      )}
                    </Badge>
                    <Badge variant={threshold.severity === 'critical' ? 'destructive' : 'secondary'}>
                      {threshold.severity}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {threshold.type === 'auto-ml' ? (
                      `Confidence: ${threshold.confidence}%`
                    ) : (
                      `Range: ${threshold.minValue || 'No min'} - ${threshold.maxValue || 'No max'}`
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={threshold.enabled} />
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
    </div>
  );
}
