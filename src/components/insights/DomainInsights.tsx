
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, DollarSign, Users, Megaphone, Settings } from "lucide-react";

const domainData = {
  sales: {
    summary: "Sales performance is strong with Q4 trending 15% above target. Pipeline quality has improved significantly.",
    insights: [
      { title: "Enterprise deals accelerating", confidence: 91, trend: "up" },
      { title: "Average deal size increased 23%", confidence: 88, trend: "up" },
      { title: "Sales cycle shortened by 8 days", confidence: 85, trend: "up" }
    ],
    metrics: [
      { name: "Revenue Growth", value: "+15.2%", status: "good" },
      { name: "Pipeline Health", value: "Strong", status: "good" },
      { name: "Win Rate", value: "34%", status: "average" }
    ]
  },
  operations: {
    summary: "Operational efficiency is improving with automation reducing manual work by 40%. However, customer support response times need attention.",
    insights: [
      { title: "Automation saving 120 hours/week", confidence: 95, trend: "up" },
      { title: "Support tickets up 18%", confidence: 92, trend: "down" },
      { title: "System uptime at 99.8%", confidence: 98, trend: "up" }
    ],
    metrics: [
      { name: "Efficiency Score", value: "+40%", status: "good" },
      { name: "Response Time", value: "2.3h", status: "poor" },
      { name: "Uptime", value: "99.8%", status: "good" }
    ]
  },
  marketing: {
    summary: "Marketing campaigns are performing well with improved targeting. Social media engagement has increased 67% month-over-month.",
    insights: [
      { title: "Social engagement up 67%", confidence: 93, trend: "up" },
      { title: "CAC decreased by 12%", confidence: 89, trend: "up" },
      { title: "Email CTR improved 34%", confidence: 87, trend: "up" }
    ],
    metrics: [
      { name: "ROAS", value: "4.2x", status: "good" },
      { name: "Lead Quality", value: "High", status: "good" },
      { name: "Brand Awareness", value: "+28%", status: "good" }
    ]
  }
};

const statusColors = {
  good: "text-green-700 bg-green-50",
  average: "text-yellow-700 bg-yellow-50",
  poor: "text-red-700 bg-red-50"
};

export function DomainInsights() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Business Domain Analysis</h3>
        <p className="text-sm text-muted-foreground">Deep insights organized by business function</p>
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Sales
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Operations
          </TabsTrigger>
          <TabsTrigger value="marketing" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            Marketing
          </TabsTrigger>
        </TabsList>

        {Object.entries(domainData).map(([domain, data]) => (
          <TabsContent key={domain} value={domain} className="space-y-6">
            {/* Domain Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{domain} Overview</CardTitle>
                <CardDescription>{data.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.metrics.map((metric, index) => (
                    <div key={index} className="text-center p-3 rounded-lg border">
                      <div className="text-2xl font-bold mb-1">{metric.value}</div>
                      <div className="text-sm text-muted-foreground mb-2">{metric.name}</div>
                      <Badge className={statusColors[metric.status as keyof typeof statusColors]}>
                        {metric.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Insights */}
            <div className="grid gap-4">
              {data.insights.map((insight, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {insight.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span className="font-medium">{insight.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{insight.confidence}% confidence</Badge>
                        <Button size="sm" variant="outline">Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
