
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Save, Calculator, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MetricBuilder() {
  const [metricName, setMetricName] = useState("");
  const [metricDescription, setMetricDescription] = useState("");
  const [formula, setFormula] = useState("");
  const [savedMetrics, setSavedMetrics] = useState([
    {
      id: 1,
      name: "Revenue Per Active User",
      formula: "SUM(revenue) / COUNT(DISTINCT user_id)",
      description: "Average revenue generated per active user"
    },
    {
      id: 2,
      name: "Customer Acquisition Cost",
      formula: "SUM(marketing_spend) / COUNT(new_customers)",
      description: "Cost to acquire each new customer"
    }
  ]);
  const { toast } = useToast();

  const operators = [
    { value: "SUM", label: "SUM()" },
    { value: "COUNT", label: "COUNT()" },
    { value: "AVG", label: "AVG()" },
    { value: "MAX", label: "MAX()" },
    { value: "MIN", label: "MIN()" }
  ];

  const fields = [
    { value: "revenue", label: "Revenue" },
    { value: "user_id", label: "User ID" },
    { value: "order_count", label: "Order Count" },
    { value: "marketing_spend", label: "Marketing Spend" },
    { value: "new_customers", label: "New Customers" }
  ];

  const handleSaveMetric = () => {
    if (!metricName || !formula) {
      toast({
        title: "Missing Information",
        description: "Please provide a name and formula for the metric",
        variant: "destructive"
      });
      return;
    }

    const newMetric = {
      id: Date.now(),
      name: metricName,
      formula,
      description: metricDescription
    };

    setSavedMetrics([...savedMetrics, newMetric]);
    setMetricName("");
    setFormula("");
    setMetricDescription("");

    toast({
      title: "Metric Saved",
      description: `"${metricName}" has been added to your custom metrics`
    });
  };

  const handleDeleteMetric = (id: number) => {
    setSavedMetrics(savedMetrics.filter(metric => metric.id !== id));
    toast({
      title: "Metric Deleted",
      description: "The custom metric has been removed"
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Metric Builder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Create Custom Metric
          </CardTitle>
          <CardDescription>
            Build custom business metrics using your data fields and functions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metric-name">Metric Name</Label>
            <Input
              id="metric-name"
              placeholder="e.g., Revenue Per Active User"
              value={metricName}
              onChange={(e) => setMetricName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metric-description">Description (Optional)</Label>
            <Textarea
              id="metric-description"
              placeholder="Describe what this metric measures..."
              value={metricDescription}
              onChange={(e) => setMetricDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Quick Formula Builder</Label>
            <div className="grid grid-cols-2 gap-2">
              {operators.map((op) => (
                <Button
                  key={op.value}
                  variant="outline"
                  size="sm"
                  onClick={() => setFormula(formula + op.value + "()")}
                >
                  {op.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Available Fields</Label>
            <div className="flex flex-wrap gap-2">
              {fields.map((field) => (
                <Badge
                  key={field.value}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => setFormula(formula + field.value)}
                >
                  {field.label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="formula">Formula</Label>
            <Textarea
              id="formula"
              placeholder="e.g., SUM(revenue) / COUNT(DISTINCT user_id)"
              value={formula}
              onChange={(e) => setFormula(e.target.value)}
              rows={3}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={handleSaveMetric} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Metric
          </Button>
        </CardContent>
      </Card>

      {/* Saved Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Custom Metrics</CardTitle>
          <CardDescription>
            Your custom business metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savedMetrics.map((metric) => (
              <div key={metric.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{metric.name}</h4>
                    {metric.description && (
                      <p className="text-sm text-muted-foreground">{metric.description}</p>
                    )}
                    <code className="text-xs bg-muted p-1 rounded mt-2 block">
                      {metric.formula}
                    </code>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteMetric(metric.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {savedMetrics.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Calculator className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No custom metrics yet</p>
                <p className="text-sm">Create your first metric to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
