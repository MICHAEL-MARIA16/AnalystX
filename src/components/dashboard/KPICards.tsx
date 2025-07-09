
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity } from "lucide-react";

const kpis = [
  {
    title: "Total Revenue",
    value: "$2,489,750",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "vs last month"
  },
  {
    title: "Active Users",
    value: "14,250",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    description: "vs last month"
  },
  {
    title: "Conversion Rate",
    value: "3.84%",
    change: "-0.3%",
    trend: "down",
    icon: Activity,
    description: "vs last month"
  },
  {
    title: "Total Orders",
    value: "9,847",
    change: "+15.1%",
    trend: "up",
    icon: ShoppingCart,
    description: "vs last month"
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;
        const trendColor = kpi.trend === "up" ? "text-green-600" : "text-red-600";
        
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendIcon className={`h-3 w-3 ${trendColor}`} />
                <span className={trendColor}>{kpi.change}</span>
                <span>{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
