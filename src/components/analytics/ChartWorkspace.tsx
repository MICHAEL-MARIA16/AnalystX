
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart, PieChart, Download, Save, Palette } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Cell, Pie } from "recharts";

interface ChartWorkspaceProps {
  filters: {
    timeRange: string;
    region: string;
    category: string;
  };
}

export function ChartWorkspace({ filters }: ChartWorkspaceProps) {
  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState("month");
  const [yAxis, setYAxis] = useState("revenue");
  const [groupBy, setGroupBy] = useState("none");
  const [colorScheme, setColorScheme] = useState("blue");

  // Mock data for charts
  const mockData = [
    { month: 'Jan', revenue: 45000, users: 1200, orders: 450 },
    { month: 'Feb', revenue: 52000, users: 1350, orders: 520 },
    { month: 'Mar', revenue: 48000, users: 1180, orders: 480 },
    { month: 'Apr', revenue: 61000, users: 1520, orders: 610 },
    { month: 'May', revenue: 58000, users: 1440, orders: 580 },
    { month: 'Jun', revenue: 67000, users: 1680, orders: 670 }
  ];

  const pieData = [
    { name: 'Electronics', value: 35, color: '#8884d8' },
    { name: 'Clothing', value: 25, color: '#82ca9d' },
    { name: 'Books', value: 20, color: '#ffc658' },
    { name: 'Home', value: 20, color: '#ff7300' }
  ];

  const chartTypeOptions = [
    { value: "bar", label: "Bar Chart", icon: BarChart3 },
    { value: "line", label: "Line Chart", icon: LineChart },
    { value: "pie", label: "Pie Chart", icon: PieChart }
  ];

  const axisOptions = [
    { value: "month", label: "Month" },
    { value: "category", label: "Category" },
    { value: "region", label: "Region" }
  ];

  const metricOptions = [
    { value: "revenue", label: "Revenue" },
    { value: "users", label: "Users" },
    { value: "orders", label: "Orders" }
  ];

  const colorSchemes = [
    { value: "blue", label: "Blue", color: "#3b82f6" },
    { value: "green", label: "Green", color: "#10b981" },
    { value: "purple", label: "Purple", color: "#8b5cf6" },
    { value: "orange", label: "Orange", color: "#f97316" }
  ];

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Bar dataKey={yAxis} fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey={yAxis} stroke="#3b82f6" strokeWidth={2} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Chart Configuration</CardTitle>
          <CardDescription>Customize your chart appearance and data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Chart Type</label>
            <div className="grid grid-cols-1 gap-2">
              {chartTypeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Button
                    key={option.value}
                    variant={chartType === option.value ? "default" : "outline"}
                    onClick={() => setChartType(option.value)}
                    className="justify-start"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {chartType !== "pie" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">X-Axis</label>
                <Select value={xAxis} onValueChange={setXAxis}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {axisOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Y-Axis (Metric)</label>
                <Select value={yAxis} onValueChange={setYAxis}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {metricOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Color Scheme</label>
            <div className="flex gap-2">
              {colorSchemes.map((scheme) => (
                <Button
                  key={scheme.value}
                  variant={colorScheme === scheme.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setColorScheme(scheme.value)}
                  className="w-8 h-8 p-0"
                  style={{ backgroundColor: colorScheme === scheme.value ? scheme.color : undefined }}
                >
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: scheme.color }}
                  />
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1">
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chart Preview */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Chart Preview</CardTitle>
            <CardDescription>
              Interactive preview of your custom chart
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderChart()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
