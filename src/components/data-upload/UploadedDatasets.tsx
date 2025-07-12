import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { FileText, Trash2, Eye, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Dataset {
  id: string;
  name: string;
  file_type: string;
  file_size: number | null;
  status: string | null;
  created_at: string;
  row_count: number | null;
}

export function UploadedDatasets() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDatasets();
    }
  }, [user]);

  const fetchDatasets = async () => {
    try {
      const { data, error } = await supabase
        .from('datasets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDatasets(data || []);
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

  const deleteDataset = async (id: string) => {
    try {
      const { error } = await supabase
        .from('datasets')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDatasets(datasets.filter(d => d.id !== id));
      toast({
        title: "Dataset deleted",
        description: "The dataset has been removed.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting dataset",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const viewInsights = (datasetId: string) => {
    navigate(`/insights?dataset=${datasetId}`);
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (datasets.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No datasets yet</h3>
          <p className="text-muted-foreground mb-4">
            Upload your first dataset to start generating AI insights
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {datasets.map((dataset) => (
        <Card key={dataset.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">{dataset.name}</h3>
                  <Badge variant={dataset.status === 'ready' ? 'default' : 'secondary'}>
                    {dataset.status || 'processing'}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Type: {dataset.file_type.toUpperCase()}</span>
                  <span>Size: {formatFileSize(dataset.file_size)}</span>
                  {dataset.row_count && <span>Rows: {dataset.row_count.toLocaleString()}</span>}
                  <span>
                    Uploaded {formatDistanceToNow(new Date(dataset.created_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {dataset.status === 'ready' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewInsights(dataset.id)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Insights
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteDataset(dataset.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}