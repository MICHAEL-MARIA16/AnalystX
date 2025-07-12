
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { InsightsView } from "./InsightsView";
import { Upload, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export function InsightsDashboard() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const datasetId = searchParams.get('dataset');
    if (datasetId) {
      setSelectedDataset(datasetId);
    }
    
    if (user) {
      fetchDatasets();
    }
  }, [user, searchParams]);

  useEffect(() => {
    if (selectedDataset) {
      fetchInsights(selectedDataset);
    }
  }, [selectedDataset]);

  const fetchDatasets = async () => {
    try {
      const { data, error } = await supabase
        .from('datasets')
        .select('id, name, file_type, status, created_at')
        .eq('status', 'ready')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDatasets(data || []);
      
      // If no dataset is selected but we have datasets, select the first one
      if (!selectedDataset && data && data.length > 0) {
        setSelectedDataset(data[0].id);
      }
    } catch (error: any) {
      toast({
        title: "Error loading datasets",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchInsights = async (datasetId: string) => {
    try {
      const { data, error } = await supabase
        .from('insights')
        .select('*')
        .eq('dataset_id', datasetId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInsights(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading insights",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (datasets.length === 0) {
    return (
      <div className="p-6 space-y-6">
        <Card>
          <CardContent className="p-12 text-center">
            <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No datasets available</h3>
            <p className="text-muted-foreground mb-4">
              Upload your data files to start generating AI insights
            </p>
            <Button onClick={() => navigate('/data-upload')}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Data
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentDataset = datasets.find(d => d.id === selectedDataset);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Insights</h2>
          <p className="text-muted-foreground">
            Explore AI-generated insights from your uploaded datasets
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate('/data-upload')}>
          <Upload className="h-4 w-4 mr-2" />
          Upload More Data
        </Button>
      </div>

      {datasets.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Dataset</CardTitle>
            <CardDescription>
              Choose a dataset to view its AI-generated insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {datasets.map((dataset) => (
                <Button
                  key={dataset.id}
                  variant={selectedDataset === dataset.id ? "default" : "outline"}
                  onClick={() => setSelectedDataset(dataset.id)}
                  className="justify-start"
                >
                  <Database className="h-4 w-4 mr-2" />
                  {dataset.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {currentDataset && (
        <InsightsView 
          dataset={currentDataset}
          insights={insights}
        />
      )}
    </div>
  );
}
