
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { BarChart3, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';

interface Dataset {
  id: string;
  name: string;
  file_type: string;
  row_count: number;
  columns_info: any;
  status: string;
  created_at: string;
}

interface Insight {
  id: string;
  insight_type: string;
  title: string;
  content: string;
  metadata: any;
  created_at: string;
}

interface InsightsViewProps {
  datasetId?: string;
}

export function InsightsView({ datasetId }: InsightsViewProps) {
  const { user } = useAuth();
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !datasetId) return;

    const fetchData = async () => {
      try {
        // Fetch dataset info
        const { data: datasetData, error: datasetError } = await supabase
          .from('datasets')
          .select('*')
          .eq('id', datasetId)
          .single();

        if (datasetError) throw datasetError;
        setDataset(datasetData);

        // Fetch insights
        const { data: insightsData, error: insightsError } = await supabase
          .from('insights')
          .select('*')
          .eq('dataset_id', datasetId)
          .order('created_at', { ascending: false });

        if (insightsError) throw insightsError;
        setInsights(insightsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, datasetId]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'summary': return <BarChart3 className="h-4 w-4" />;
      case 'trends': return <TrendingUp className="h-4 w-4" />;
      case 'anomalies': return <AlertTriangle className="h-4 w-4" />;
      case 'recommendations': return <Lightbulb className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'summary': return 'bg-blue-100 text-blue-800';
      case 'trends': return 'bg-green-100 text-green-800';
      case 'anomalies': return 'bg-red-100 text-red-800';
      case 'recommendations': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!dataset) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">Dataset not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dataset Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {dataset.name}
            <Badge variant={dataset.status === 'ready' ? 'default' : 'secondary'}>
              {dataset.status}
            </Badge>
          </CardTitle>
          <CardDescription>
            {dataset.file_type.toUpperCase()} file • {dataset.row_count} rows • 
            Uploaded {new Date(dataset.created_at).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        {dataset.columns_info && (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.keys(dataset.columns_info).map((column) => (
                <Badge key={column} variant="outline">
                  {column}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Insights */}
      <div className="grid gap-6">
        {insights.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-muted-foreground">
                {dataset.status === 'processing' 
                  ? 'Generating insights... This may take a few minutes.'
                  : 'No insights available yet. Try uploading a new dataset.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          insights.map((insight) => (
            <Card key={insight.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getInsightIcon(insight.insight_type)}
                  {insight.title}
                  <Badge className={getInsightColor(insight.insight_type)}>
                    {insight.insight_type}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{insight.content}</p>
                </div>
                {insight.metadata && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <pre className="text-sm overflow-auto">
                      {JSON.stringify(insight.metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
