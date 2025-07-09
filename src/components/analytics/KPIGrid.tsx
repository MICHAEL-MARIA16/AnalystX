
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Target } from "lucide-react";

interface KPIGridProps {
  filters: {
    timeRange: string;
    region: string;
    category: string;
  };
}

export function KPIGrid({ filters }: KPIGridProps) {
  const kpis = [
    {
      title: "Total Revenue",
      value: "$2,567,890",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "vs previous period"
    },
    {
      title: "Active Users",
      value: "45,231",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      description: "monthly active users"
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-0.4%",
      trend: "down",
      icon: Target,
      description: "visitors to customers"
    },
    {
      title: "Average Order Value",
      value: "$156.78",
      change: "+5.1%",
      trend: "up",
      icon: ShoppingCart,
      description: "per transaction"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;
        const trendColor = kpi.trend === "up" ? "text-green-600" : "text-red-600";
        
        return (
          <Card key={kpi.title} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className={`flex items-center gap-1 ${trendColor}`}>
                  <TrendIcon className="h-3 w-3" />
                  {kpi.change}
                </span>
                <span>{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
