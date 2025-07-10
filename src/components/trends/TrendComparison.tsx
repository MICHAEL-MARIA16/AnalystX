
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { GitCompare, Plus } from "lucide-react";

export function TrendComparison() {
  const [comparisonType, setComparisonType] = useState("regions");

  const comparisonData = [
    { period: "Q1 2023", "North America": 4500, "Europe": 3200, "Asia": 2800 },
    { period: "Q2 2023", "North America": 5200, "Europe": 3800, "Asia": 3400 },
    { period: "Q3 2023", "North America": 6100, "Europe": 4200, "Asia": 4100 },
    { period: "Q4 2023", "North America": 6800, "Europe": 4900, "Asia": 4800 }
  ];

  const colors = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"];

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <Select value={comparisonType} onValueChange={setComparisonType}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="regions">Compare Regions</SelectItem>
            <SelectItem value="products">Compare Products</SelectItem>
            <SelectItem value="channels">Compare Channels</SelectItem>
            <SelectItem value="demographics">Compare Demographics</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Comparison
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5" />
            Trend Comparison
          </CardTitle>
          <CardDescription>
            Compare trends across different categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="North America" 
                  stroke={colors[0]} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="Europe" 
                  stroke={colors[1]} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="Asia" 
                  stroke={colors[2]} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">North America</CardTitle>
            <CardDescription>Leading performer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Growth Rate</span>
                <span className="font-medium text-green-600">+15.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Peak Quarter</span>
                <span className="font-medium">Q4 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Consistency</span>
                <span className="font-medium text-blue-600">High</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Europe</CardTitle>
            <CardDescription>Steady growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Growth Rate</span>
                <span className="font-medium text-green-600">+12.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Peak Quarter</span>
                <span className="font-medium">Q4 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Consistency</span>
                <span className="font-medium text-blue-600">Medium</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Asia</CardTitle>
            <CardDescription>Emerging market</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Growth Rate</span>
                <span className="font-medium text-green-600">+18.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Peak Quarter</span>
                <span className="font-medium">Q4 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Consistency</span>
                <span className="font-medium text-orange-600">Variable</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
