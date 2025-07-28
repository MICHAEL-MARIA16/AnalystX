import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, Download, Database } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface Dataset {
  id: string;
  name: string;
  description: string | null;
  file_type: string;
  file_size: number | null;
  row_count: number | null;
  columns_info: any;
  status: string;
  created_at: string;
}

interface UploadedDatasetsProps {
  refreshTrigger: number;
}

export function UploadedDatasets({ refreshTrigger }: UploadedDatasetsProps) {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDatasets = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('datasets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDatasets(data || []);
    } catch (error) {
      console.error('Error fetching datasets:', error);
      toast({
        title: "Error loading datasets",
        description: "Could not load your datasets. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, [refreshTrigger]);

  const deleteDataset = async (id: string) => {
    try {
      const { error } = await supabase
        .from('datasets')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDatasets(prev => prev.filter(d => d.id !== id));
      toast({
        title: "Dataset deleted",
        description: "The dataset has been removed successfully.",
      });
    } catch (error) {
      console.error('Error deleting dataset:', error);
      toast({
        title: "Error deleting dataset",
        description: "Could not delete the dataset. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Datasets</CardTitle>
          <CardDescription>Your uploaded datasets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (datasets.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Datasets</CardTitle>
          <CardDescription>Your uploaded datasets will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No datasets yet</h3>
            <p className="text-muted-foreground mb-4">
              Upload your first dataset to start generating AI insights
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Datasets</CardTitle>
        <CardDescription>Manage your uploaded datasets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {datasets.map((dataset) => (
            <div
              key={dataset.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{dataset.name}</h4>
                  <Badge variant={dataset.status === 'ready' ? 'default' : 'secondary'}>
                    {dataset.status}
                  </Badge>
                </div>
                {dataset.description && (
                  <p className="text-sm text-muted-foreground">{dataset.description}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{dataset.file_type.toUpperCase()}</span>
                  <span>{formatFileSize(dataset.file_size)}</span>
                  {dataset.row_count && <span>{dataset.row_count} rows</span>}
                  {dataset.columns_info?.columns && (
                    <span>{dataset.columns_info.columns.length} columns</span>
                  )}
                  <span>{formatDistanceToNow(new Date(dataset.created_at), { addSuffix: true })}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteDataset(dataset.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}