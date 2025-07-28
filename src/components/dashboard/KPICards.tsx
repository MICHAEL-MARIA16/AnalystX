
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity, Database, BarChart3 } from "lucide-react";

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

interface KPICardsProps {
  datasets?: any[];
}

export function KPICards({ datasets = [] }: KPICardsProps) {
  // Calculate KPIs from user datasets
  const totalDatasets = datasets.length;
  const totalRows = datasets.reduce((sum, d) => sum + (d.row_count || 0), 0);
  const totalColumns = datasets.reduce((sum, d) => sum + (d.columns_info?.columns?.length || 0), 0);
  const avgRowsPerDataset = totalDatasets > 0 ? Math.round(totalRows / totalDatasets) : 0;

  const dynamicKpis = [
    {
      title: "Total Datasets",
      value: totalDatasets.toString(),
      change: datasets.length > 0 ? "Ready" : "Upload data",
      trend: "up",
      icon: Database,
      description: "uploaded datasets"
    },
    {
      title: "Total Records",
      value: totalRows.toLocaleString(),
      change: `${totalColumns} columns`,
      trend: "up", 
      icon: BarChart3,
      description: "across all datasets"
    },
    {
      title: "Avg Dataset Size",
      value: avgRowsPerDataset.toLocaleString(),
      change: "records avg",
      trend: "up",
      icon: Activity,
      description: "per dataset"
    },
    {
      title: "Data Quality",
      value: datasets.filter(d => d.status === 'ready').length > 0 ? "Good" : "No Data",
      change: `${datasets.filter(d => d.status === 'ready').length}/${totalDatasets} ready`,
      trend: datasets.filter(d => d.status === 'ready').length === totalDatasets ? "up" : "down",
      icon: TrendingUp,
      description: "datasets processed"
    },
  ];
  const kpisToShow = totalDatasets > 0 ? dynamicKpis : kpis;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpisToShow.map((kpi, index) => {
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
