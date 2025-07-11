
import React, { useState, useEffect } from 'react';
import { FileUpload } from '@/components/data-upload/FileUpload';
import { InsightsView } from '@/components/insights/InsightsView';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Upload, BarChart3, FileText } from 'lucide-react';

interface Dataset {
  id: string;
  name: string;
  file_type: string;
  status: string;
  created_at: string;
}

export function MainDashboard() {
  const { user } = useAuth();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchDatasets = async () => {
      const { data, error } = await supabase
        .from('datasets')
        .select('id, name, file_type, status, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setDatasets(data);
        if (data.length > 0 && !selectedDataset) {
          setSelectedDataset(data[0].id);
        }
      }
    };

    fetchDatasets();
  }, [user, selectedDataset]);

  const handleUploadComplete = (datasetId: string) => {
    setSelectedDataset(datasetId);
    setShowUpload(false);
    // Refresh datasets list
    const fetchDatasets = async () => {
      const { data, error } = await supabase
        .from('datasets')
        .select('id, name, file_type, status, created_at')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setDatasets(data);
      }
    };
    fetchDatasets();
  };

  if (showUpload || datasets.length === 0) {
    return (
      <div className="container mx-auto py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to Your Data Analytics Platform</h1>
          <p className="text-xl text-muted-foreground">
            Upload your data and get AI-powered insights instantly
          </p>
        </div>
        
        <FileUpload onUploadComplete={handleUploadComplete} />
        
        {datasets.length > 0 && (
          <div className="text-center">
            <Button variant="outline" onClick={() => setShowUpload(false)}>
              View Previous Uploads
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Your Datasets
              </CardTitle>
              <CardDescription>
                Select a dataset to view insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                onClick={() => setShowUpload(true)}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload New Data
              </Button>
              
              <div className="space-y-2">
                {datasets.map((dataset) => (
                  <Button
                    key={dataset.id}
                    variant={selectedDataset === dataset.id ? "default" : "ghost"}
                    className="w-full justify-start text-left"
                    onClick={() => setSelectedDataset(dataset.id)}
                  >
                    <div className="truncate">
                      <div className="font-medium truncate">{dataset.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {dataset.file_type.toUpperCase()} • {dataset.status}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {selectedDataset ? (
            <InsightsView datasetId={selectedDataset} />
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="text-lg font-medium">No Dataset Selected</h3>
                    <p className="text-muted-foreground">
                      Select a dataset from the sidebar to view insights
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
