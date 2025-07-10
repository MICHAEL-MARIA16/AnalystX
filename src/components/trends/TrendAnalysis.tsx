
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown, Calendar, Pin } from "lucide-react";

export function TrendAnalysis() {
  const [timeframe, setTimeframe] = useState("monthly");
  const [viewType, setViewType] = useState("cumulative");

  const trendData = [
    { period: "Jan 2023", value: 4500, growth: 12 },
    { period: "Feb 2023", value: 5200, growth: 15.6 },
    { period: "Mar 2023", value: 4800, growth: -7.7 },
    { period: "Apr 2023", value: 6100, growth: 27.1 },
    { period: "May 2023", value: 6800, growth: 11.5 },
    { period: "Jun 2023", value: 7200, growth: 5.9 },
    { period: "Jul 2023", value: 8500, growth: 18.1 },
    { period: "Aug 2023", value: 7900, growth: -7.1 },
    { period: "Sep 2023", value: 9200, growth: 16.5 },
    { period: "Oct 2023", value: 10100, growth: 9.8 },
    { period: "Nov 2023", value: 11200, growth: 10.9 },
    { period: "Dec 2023", value: 12800, growth: 14.3 }
  ];

  return (
    <div className="grid gap-6">
      <div className="flex gap-4 items-center">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Week-over-Week</SelectItem>
            <SelectItem value="monthly">Month-over-Month</SelectItem>
            <SelectItem value="quarterly">Quarter-over-Quarter</SelectItem>
            <SelectItem value="yearly">Year-over-Year</SelectItem>
          </SelectContent>
        </Select>

        <Select value={viewType} onValueChange={setViewType}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cumulative">Cumulative View</SelectItem>
            <SelectItem value="snapshot">Snapshot View</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <Pin className="h-4 w-4 mr-2" />
          Pin to Dashboard
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">+12.4%</span>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs previous period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Peak Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">Dec 2023</span>
              <Calendar className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">12,800 units</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Volatility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">Medium</span>
              <TrendingDown className="h-4 w-4 text-orange-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">±8.3% deviation</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trend Visualization</CardTitle>
          <CardDescription>
            {timeframe} trend analysis with growth indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {viewType === "cumulative" ? (
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              ) : (
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Growth Rate Analysis</CardTitle>
          <CardDescription>
            Period-over-period growth percentages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {trendData.slice(-6).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded">
                <span className="font-medium">{item.period}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={item.growth > 0 ? "default" : "destructive"}>
                    {item.growth > 0 ? "+" : ""}{item.growth}%
                  </Badge>
                  {item.growth > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
