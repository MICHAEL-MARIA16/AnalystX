
import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { QueryInterface } from "./QueryInterface";
import { KPICards } from "./KPICards";
import { ChartContainer } from "./ChartContainer";
import { InsightsPanel } from "./InsightsPanel";
import { AnomalyAlerts } from "./AnomalyAlerts";
import { RecentQueries } from "./RecentQueries";

export interface QueryResult {
  id: string;
  query: string;
  sql: string;
  data: any[];
  chartType: 'bar' | 'line' | 'pie' | 'area';
  insights: string;
  timestamp: Date;
}

export function Dashboard() {
  const [queryResults, setQueryResults] = useState<QueryResult[]>([]);
  const [currentResult, setCurrentResult] = useState<QueryResult | null>(null);

  const handleQuerySubmit = async (query: string) => {
    // Simulate AI processing
    const mockResult: QueryResult = {
      id: Date.now().toString(),
      query,
      sql: `SELECT * FROM sales WHERE created_at >= '2024-01-01'`,
      data: [
        { month: 'Jan', revenue: 45000, users: 1200 },
        { month: 'Feb', revenue: 52000, users: 1350 },
        { month: 'Mar', revenue: 48000, users: 1180 },
        { month: 'Apr', revenue: 61000, users: 1520 },
        { month: 'May', revenue: 58000, users: 1440 },
        { month: 'Jun', revenue: 67000, users: 1680 },
      ],
      chartType: 'bar',
      insights: `Based on the analysis of your ${query.toLowerCase()}, I found that revenue has grown by 49% from January to June, with particularly strong performance in April and June. User acquisition has also increased steadily, suggesting healthy business growth.`,
      timestamp: new Date(),
    };

    setQueryResults(prev => [mockResult, ...prev]);
    setCurrentResult(mockResult);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          {/* Header */}
          <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-lg font-semibold">AnalystX Dashboard</h1>
                <p className="text-sm text-muted-foreground">Real-time AI-powered data analysis</p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6 space-y-6">
            {/* KPI Cards */}
            <KPICards />

            {/* Anomaly Alerts */}
            <AnomalyAlerts />

            {/* Query Interface */}
            <QueryInterface onQuerySubmit={handleQuerySubmit} />

            {/* Results Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Charts and Data */}
              <div className="lg:col-span-2">
                {currentResult && <ChartContainer result={currentResult} />}
              </div>

              {/* Insights Panel */}
              <div className="space-y-6">
                {currentResult && <InsightsPanel result={currentResult} />}
                <RecentQueries queries={queryResults} onSelectQuery={setCurrentResult} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
