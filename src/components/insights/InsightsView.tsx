
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb,
  FileText,
  Calendar
} from "lucide-react";

interface Dataset {
  id: string;
  name: string;
  file_type: string;
  status: string | null;
  created_at: string;
}

interface Insight {
  id: string;
  title: string;
  content: string;
  insight_type: string;
  created_at: string;
  metadata: any;
}

interface InsightsViewProps {
  dataset: Dataset;
  insights: Insight[];
}

const getInsightIcon = (type: string) => {
  switch (type) {
    case 'summary':
      return BarChart3;
    case 'trends':
      return TrendingUp;
    case 'anomalies':
      return AlertTriangle;
    case 'recommendations':
      return Lightbulb;
    default:
      return FileText;
  }
};

const getInsightColor = (type: string) => {
  switch (type) {
    case 'summary':
      return 'bg-blue-500/10 text-blue-700 border-blue-200';
    case 'trends':
      return 'bg-green-500/10 text-green-700 border-green-200';
    case 'anomalies':
      return 'bg-orange-500/10 text-orange-700 border-orange-200';
    case 'recommendations':
      return 'bg-purple-500/10 text-purple-700 border-purple-200';
    default:
      return 'bg-gray-500/10 text-gray-700 border-gray-200';
  }
};

export function InsightsView({ dataset, insights }: InsightsViewProps) {
  const groupedInsights = insights.reduce((acc, insight) => {
    if (!acc[insight.insight_type]) {
      acc[insight.insight_type] = [];
    }
    acc[insight.insight_type].push(insight);
    return acc;
  }, {} as Record<string, Insight[]>);

  const insightTypes = [
    { key: 'summary', label: 'Summary', description: 'Key statistics and overview' },
    { key: 'trends', label: 'Trends', description: 'Notable patterns in your data' },
    { key: 'anomalies', label: 'Anomalies', description: 'Unusual or outlier data points' },
    { key: 'recommendations', label: 'Recommendations', description: 'Actionable insights and suggestions' }
  ];

  if (insights.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Generating insights...</h3>
          <p className="text-muted-foreground">
            AI is analyzing your data. This may take a few moments.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dataset Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {dataset.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-4 mt-2">
                <span>Type: {dataset.file_type.toUpperCase()}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDistanceToNow(new Date(dataset.created_at), { addSuffix: true })}
                </span>
              </CardDescription>
            </div>
            <Badge variant="default">
              {insights.length} insight{insights.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Insights */}
      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          {insightTypes.map((type) => {
            const Icon = getInsightIcon(type.key);
            const hasInsights = groupedInsights[type.key]?.length > 0;
            
            return (
              <TabsTrigger 
                key={type.key} 
                value={type.key}
                disabled={!hasInsights}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {type.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {insightTypes.map((type) => {
          const typeInsights = groupedInsights[type.key] || [];
          const Icon = getInsightIcon(type.key);
          
          return (
            <TabsContent key={type.key} value={type.key} className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
                  <Icon className="h-5 w-5" />
                  {type.label}
                </h3>
                <p className="text-muted-foreground">{type.description}</p>
              </div>

              {typeInsights.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Icon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      No {type.label.toLowerCase()} available for this dataset
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {typeInsights.map((insight) => (
                    <Card key={insight.id} className={`border-l-4 ${getInsightColor(insight.insight_type)}`}>
                      <CardHeader>
                        <CardTitle className="text-base">{insight.title}</CardTitle>
                        <CardDescription>
                          Generated {formatDistanceToNow(new Date(insight.created_at), { addSuffix: true })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-sm max-w-none">
                          <div className="whitespace-pre-wrap">{insight.content}</div>
                        </div>
                        {insight.metadata && (
                          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-2">Metadata:</p>
                            <div className="text-xs space-y-1">
                              {insight.metadata.columns && (
                                <p>Columns analyzed: {insight.metadata.columns.join(', ')}</p>
                              )}
                              {insight.metadata.rowCount && (
                                <p>Rows processed: {insight.metadata.rowCount.toLocaleString()}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
