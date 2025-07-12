import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, TrendingUp, Users, ShoppingCart } from "lucide-react";

interface DemoDataLoaderProps {
  onDemoLoaded: (datasetId: string) => void;
}

const DEMO_DATASETS = [
  {
    id: 'sales-data',
    name: 'Sales Performance Data',
    description: 'Monthly sales data with product categories, regions, and revenue',
    icon: TrendingUp,
    data: [
      { month: 'Jan 2024', region: 'North', category: 'Electronics', revenue: 45000, units: 150 },
      { month: 'Jan 2024', region: 'South', category: 'Electronics', revenue: 38000, units: 127 },
      { month: 'Jan 2024', region: 'East', category: 'Clothing', revenue: 22000, units: 220 },
      { month: 'Feb 2024', region: 'North', category: 'Electronics', revenue: 52000, units: 173 },
      { month: 'Feb 2024', region: 'South', category: 'Electronics', revenue: 41000, units: 137 },
      { month: 'Feb 2024', region: 'East', category: 'Clothing', revenue: 25000, units: 250 },
      { month: 'Mar 2024', region: 'North', category: 'Electronics', revenue: 48000, units: 160 },
      { month: 'Mar 2024', region: 'South', category: 'Electronics', revenue: 44000, units: 147 },
      { month: 'Mar 2024', region: 'East', category: 'Clothing', revenue: 28000, units: 280 },
    ]
  },
  {
    id: 'customer-data',
    name: 'Customer Analytics',
    description: 'Customer demographics, engagement, and satisfaction metrics',
    icon: Users,
    data: [
      { customer_id: 'C001', age: 25, gender: 'F', location: 'Urban', satisfaction: 4.2, orders: 12 },
      { customer_id: 'C002', age: 34, gender: 'M', location: 'Suburban', satisfaction: 3.8, orders: 8 },
      { customer_id: 'C003', age: 42, gender: 'F', location: 'Rural', satisfaction: 4.5, orders: 15 },
      { customer_id: 'C004', age: 28, gender: 'M', location: 'Urban', satisfaction: 4.1, orders: 10 },
      { customer_id: 'C005', age: 55, gender: 'F', location: 'Suburban', satisfaction: 3.9, orders: 6 },
      { customer_id: 'C006', age: 31, gender: 'M', location: 'Urban', satisfaction: 4.3, orders: 14 },
      { customer_id: 'C007', age: 26, gender: 'F', location: 'Rural', satisfaction: 4.0, orders: 9 },
      { customer_id: 'C008', age: 45, gender: 'M', location: 'Suburban', satisfaction: 3.7, orders: 7 },
    ]
  },
  {
    id: 'ecommerce-data',
    name: 'E-commerce Metrics',
    description: 'Website traffic, conversion rates, and product performance',
    icon: ShoppingCart,
    data: [
      { date: '2024-01-01', visitors: 1250, conversions: 87, revenue: 4350, bounce_rate: 0.32 },
      { date: '2024-01-02', visitors: 1180, conversions: 92, revenue: 4600, bounce_rate: 0.29 },
      { date: '2024-01-03', visitors: 1320, conversions: 98, revenue: 4900, bounce_rate: 0.28 },
      { date: '2024-01-04', visitors: 1450, conversions: 112, revenue: 5600, bounce_rate: 0.25 },
      { date: '2024-01-05', visitors: 1390, conversions: 105, revenue: 5250, bounce_rate: 0.27 },
      { date: '2024-01-06', visitors: 1620, conversions: 128, revenue: 6400, bounce_rate: 0.22 },
      { date: '2024-01-07', visitors: 1580, conversions: 124, revenue: 6200, bounce_rate: 0.24 },
    ]
  }
];

export function DemoDataLoader({ onDemoLoaded }: DemoDataLoaderProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const loadDemoData = async (demoDataset: typeof DEMO_DATASETS[0]) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to load demo data.",
        variant: "destructive",
      });
      return;
    }

    setLoading(demoDataset.id);

    try {
      // Create a blob from the demo data
      const csvContent = convertToCSV(demoDataset.data);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      
      // Upload to storage
      const fileName = `${user.id}/demo-${demoDataset.id}-${Date.now()}.csv`;
      const { error: uploadError } = await supabase.storage
        .from('datasets')
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      // Get file URL
      const { data: { publicUrl } } = supabase.storage
        .from('datasets')
        .getPublicUrl(fileName);

      // Create dataset record
      const { data: dataset, error: dbError } = await supabase
        .from('datasets')
        .insert({
          user_id: user.id,
          name: `${demoDataset.name} (Demo)`,
          file_type: 'csv',
          file_size: blob.size,
          file_url: publicUrl,
          status: 'processing',
          description: demoDataset.description
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Process the dataset
      const { error: processError } = await supabase.functions.invoke('process-dataset', {
        body: { datasetId: dataset.id, fileUrl: publicUrl, fileType: 'csv' }
      });

      if (processError) throw processError;

      toast({
        title: "Demo data loaded!",
        description: `${demoDataset.name} has been loaded successfully.`,
      });

      onDemoLoaded(dataset.id);
    } catch (error: any) {
      console.error('Demo data loading error:', error);
      toast({
        title: "Error loading demo data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' ? `"${value}"` : value;
        }).join(',')
      )
    ];
    
    return csvRows.join('\n');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Try Demo Datasets</h3>
        <p className="text-muted-foreground">
          Load sample data to explore AI-powered insights without uploading your own files
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {DEMO_DATASETS.map((dataset) => {
          const Icon = dataset.icon;
          return (
            <Card key={dataset.id} className="relative">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">{dataset.name}</CardTitle>
                </div>
                <CardDescription>{dataset.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => loadDemoData(dataset)}
                  disabled={loading === dataset.id || !user}
                  className="w-full"
                >
                  {loading === dataset.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Load Demo Data
                    </>
                  )}
                </Button>
                {!user && (
                  <p className="text-xs text-destructive mt-2 text-center">
                    Please log in to load demo data
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}