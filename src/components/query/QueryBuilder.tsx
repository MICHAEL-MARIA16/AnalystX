
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Database, Download, Play, Save, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QueryResult {
  columns: string[];
  rows: any[][];
  executionTime: number;
}

export function QueryBuilder() {
  const [query, setQuery] = useState("");
  const [dataSource, setDataSource] = useState("");
  const [generatedSQL, setGeneratedSQL] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [activeTab, setActiveTab] = useState("builder");
  const { toast } = useToast();

  const dataSources = [
    { value: "postgres_main", label: "PostgreSQL - Main DB" },
    { value: "mysql_analytics", label: "MySQL - Analytics DB" },
    { value: "csv_sales", label: "CSV - Sales Data" },
    { value: "sheets_marketing", label: "Google Sheets - Marketing" },
    { value: "bigquery_warehouse", label: "BigQuery - Data Warehouse" },
  ];

  const exampleQueries = [
    "Show total sales by product category for the last 3 months",
    "Find customers with highest churn risk",
    "Compare revenue by region year over year",
    "List top 10 performing marketing campaigns",
    "Show user engagement trends by device type",
  ];

  const handleGenerateSQL = async () => {
    if (!query.trim() || !dataSource) {
      toast({
        title: "Missing Information",
        description: "Please enter a query and select a data source",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    // Simulate AI SQL generation
    setTimeout(() => {
      const mockSQL = `-- Generated SQL for: "${query}"
-- Data Source: ${dataSources.find(ds => ds.value === dataSource)?.label}

SELECT 
    category,
    SUM(revenue) as total_revenue,
    COUNT(*) as transaction_count,
    AVG(revenue) as avg_revenue
FROM sales_data 
WHERE date >= DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH)
GROUP BY category
ORDER BY total_revenue DESC;`;
      
      setGeneratedSQL(mockSQL);
      setIsGenerating(false);
      setActiveTab("sql");
    }, 2000);
  };

  const handleExecuteQuery = async () => {
    if (!generatedSQL) {
      toast({
        title: "No SQL to Execute",
        description: "Please generate SQL first",
        variant: "destructive",
      });
      return;
    }

    setIsExecuting(true);
    // Simulate query execution
    setTimeout(() => {
      const mockResult: QueryResult = {
        columns: ["Category", "Total Revenue", "Transaction Count", "Avg Revenue"],
        rows: [
          ["Electronics", "$125,450", "1,243", "$100.92"],
          ["Clothing", "$89,230", "2,156", "$41.40"],
          ["Books", "$45,670", "987", "$46.27"],
          ["Home & Garden", "$67,890", "756", "$89.80"],
          ["Sports", "$34,560", "456", "$75.79"],
        ],
        executionTime: 1.2
      };
      
      setQueryResult(mockResult);
      setIsExecuting(false);
      setActiveTab("results");
      
      toast({
        title: "Query Executed Successfully",
        description: `Retrieved ${mockResult.rows.length} rows in ${mockResult.executionTime}s`,
      });
    }, 1500);
  };

  const handleSaveQuery = () => {
    if (!query.trim() || !generatedSQL) {
      toast({
        title: "Cannot Save Query",
        description: "Please complete the query and generate SQL first",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Query Saved",
      description: "Your query has been saved to your collection",
    });
  };

  const handleDownloadResults = (format: 'csv' | 'json') => {
    if (!queryResult) return;
    
    toast({
      title: "Download Started",
      description: `Downloading results as ${format.toUpperCase()}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Smart Query Builder
        </CardTitle>
        <CardDescription>
          Build natural language queries and get AI-generated SQL with real-time preview
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Query Input Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Natural Language Query</label>
            <Textarea
              placeholder="e.g., Show total sales by product category for the last 3 months"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Data Source</label>
              <Select value={dataSource} onValueChange={setDataSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a data source" />
                </SelectTrigger>
                <SelectContent>
                  {dataSources.map((source) => (
                    <SelectItem key={source.value} value={source.value}>
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        {source.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button 
                onClick={handleGenerateSQL} 
                disabled={isGenerating || !query.trim() || !dataSource}
                className="flex-1"
              >
                {isGenerating ? "Generating..." : "Generate SQL"}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSaveQuery}
                disabled={!query.trim() || !generatedSQL}
              >
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Example Queries */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quick Examples</label>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((example, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80 transition-colors text-xs"
                  onClick={() => setQuery(example)}
                >
                  {example}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="builder">Builder</TabsTrigger>
            <TabsTrigger value="sql" disabled={!generatedSQL}>Generated SQL</TabsTrigger>
            <TabsTrigger value="results" disabled={!queryResult}>Results</TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center text-muted-foreground">
                  <Brain className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Enter your natural language query above and select a data source to get started</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sql" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Generated SQL</CardTitle>
                <Button 
                  onClick={handleExecuteQuery} 
                  disabled={isExecuting}
                  size="sm"
                >
                  {isExecuting ? (
                    "Executing..."
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-1" />
                      Execute
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                  {generatedSQL}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-sm font-medium">Query Results</CardTitle>
                  {queryResult && (
                    <CardDescription>
                      {queryResult.rows.length} rows • Executed in {queryResult.executionTime}s
                    </CardDescription>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadResults('csv')}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    CSV
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadResults('json')}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    JSON
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {queryResult && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          {queryResult.columns.map((column, index) => (
                            <th key={index} className="border border-border p-2 text-left font-medium">
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {queryResult.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-muted/50">
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="border border-border p-2">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
