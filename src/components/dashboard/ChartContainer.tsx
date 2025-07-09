
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer as Chart, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { QueryResult } from "./Dashboard";

interface ChartContainerProps {
  result: QueryResult;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  users: {
    label: "Users",
    color: "hsl(var(--secondary))",
  },
};

export function ChartContainer({ result }: ChartContainerProps) {
  const renderChart = () => {
    switch (result.chartType) {
      case 'bar':
        return (
          <BarChart data={result.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" />
            <Bar dataKey="users" fill="var(--color-users)" />
          </BarChart>
        );
      
      case 'line':
        return (
          <LineChart data={result.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
            <Line type="monotone" dataKey="users" stroke="var(--color-users)" strokeWidth={2} />
          </LineChart>
        );
      
      case 'area':
        return (
          <AreaChart data={result.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey="revenue" stackId="1" stroke="var(--color-revenue)" fill="var(--color-revenue)" fillOpacity={0.6} />
            <Area type="monotone" dataKey="users" stackId="1" stroke="var(--color-users)" fill="var(--color-users)" fillOpacity={0.6} />
          </AreaChart>
        );
      
      case 'pie':
        const pieData = result.data.map((item, index) => ({
          name: item.month,
          value: item.revenue,
          fill: COLORS[index % COLORS.length]
        }));
        
        return (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Visualization</CardTitle>
        <CardDescription>
          Generated SQL: <code className="bg-muted px-1 py-0.5 rounded text-xs">{result.sql}</code>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Chart config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </Chart>
      </CardContent>
    </Card>
  );
}
