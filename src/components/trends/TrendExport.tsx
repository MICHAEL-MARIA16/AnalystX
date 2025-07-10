
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Share2, Pin } from "lucide-react";

export function TrendExport() {
  const exportOptions = [
    { id: "charts", label: "Trend Charts", description: "Visual charts and graphs" },
    { id: "data", label: "Raw Data", description: "CSV data exports" },
    { id: "insights", label: "AI Insights", description: "Generated summaries and recommendations" },
    { id: "comparisons", label: "Comparisons", description: "Side-by-side analysis" }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Trend Analysis
          </CardTitle>
          <CardDescription>
            Generate comprehensive trend reports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Include in Export</Label>
            {exportOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-2">
                <Checkbox id={option.id} defaultChecked />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor={option.id} className="text-sm font-medium">
                    {option.label}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Export Format</Label>
            <Select defaultValue="pdf">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Report</SelectItem>
                <SelectItem value="powerpoint">PowerPoint</SelectItem>
                <SelectItem value="excel">Excel Workbook</SelectItem>
                <SelectItem value="csv">CSV Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Export Now
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pin className="h-5 w-5" />
            Dashboard Widgets
          </CardTitle>
          <CardDescription>
            Pin trends to your main dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 border rounded">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Revenue Trend</h4>
                <Button size="sm" variant="outline">Pin</Button>
              </div>
              <p className="text-sm text-muted-foreground">Monthly revenue trends with growth indicators</p>
            </div>

            <div className="p-3 border rounded">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Regional Comparison</h4>
                <Button size="sm" variant="outline">Pin</Button>
              </div>
              <p className="text-sm text-muted-foreground">Compare performance across regions</p>
            </div>

            <div className="p-3 border rounded">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Seasonal Insights</h4>
                <Button size="sm" variant="outline">Pin</Button>
              </div>
              <p className="text-sm text-muted-foreground">AI-generated seasonal pattern analysis</p>
            </div>
          </div>

          <div className="p-4 bg-muted rounded">
            <h4 className="font-medium mb-2">Quick Actions</h4>
            <div className="space-y-2">
              <Button size="sm" variant="ghost" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Create Trend Report Template
              </Button>
              <Button size="sm" variant="ghost" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export All Trends
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
