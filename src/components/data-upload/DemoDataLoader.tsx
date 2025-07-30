import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, BarChart, Users, ShoppingCart, TrendingUp, Zap, Target, Globe, Calendar, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const demoDatasets = [
  {
    id: 'sales-demo',
    name: 'Sales Performance Data',
    description: 'Monthly sales data with revenue, units sold, and regional breakdown',
    icon: BarChart,
    type: 'Sales Analytics',
    rows: 150,
    columns: ['month', 'region', 'revenue', 'units_sold', 'product_category', 'sales_rep'],
    data: [
      { month: '2024-01', region: 'North', revenue: 45000, units_sold: 120, product_category: 'Electronics', sales_rep: 'John Doe' },
      { month: '2024-01', region: 'South', revenue: 38000, units_sold: 95, product_category: 'Electronics', sales_rep: 'Jane Smith' },
      { month: '2024-01', region: 'East', revenue: 52000, units_sold: 140, product_category: 'Home & Garden', sales_rep: 'Mike Johnson' },
      { month: '2024-01', region: 'West', revenue: 48000, units_sold: 110, product_category: 'Electronics', sales_rep: 'Sarah Wilson' },
      { month: '2024-02', region: 'North', revenue: 47000, units_sold: 125, product_category: 'Electronics', sales_rep: 'John Doe' },
      { month: '2024-02', region: 'South', revenue: 41000, units_sold: 102, product_category: 'Home & Garden', sales_rep: 'Jane Smith' },
      { month: '2024-02', region: 'East', revenue: 55000, units_sold: 148, product_category: 'Electronics', sales_rep: 'Mike Johnson' },
      { month: '2024-02', region: 'West', revenue: 50000, units_sold: 115, product_category: 'Electronics', sales_rep: 'Sarah Wilson' },
      { month: '2024-03', region: 'North', revenue: 53000, units_sold: 135, product_category: 'Home & Garden', sales_rep: 'John Doe' },
      { month: '2024-03', region: 'South', revenue: 44000, units_sold: 108, product_category: 'Electronics', sales_rep: 'Jane Smith' },
    ]
  },
  {
    id: 'customer-demo',
    name: 'Customer Analytics Data',
    description: 'Customer behavior, demographics, and satisfaction metrics',
    icon: Users,
    type: 'Customer Analytics',
    rows: 200,
    columns: ['customer_id', 'age', 'gender', 'location', 'signup_date', 'ltv', 'satisfaction_score'],
    data: [
      { customer_id: 'C001', age: 28, gender: 'F', location: 'New York', signup_date: '2023-01-15', ltv: 1250, satisfaction_score: 8.5 },
      { customer_id: 'C002', age: 34, gender: 'M', location: 'California', signup_date: '2023-02-20', ltv: 890, satisfaction_score: 7.2 },
      { customer_id: 'C003', age: 45, gender: 'F', location: 'Texas', signup_date: '2023-01-30', ltv: 2100, satisfaction_score: 9.1 },
      { customer_id: 'C004', age: 22, gender: 'M', location: 'Florida', signup_date: '2023-03-10', ltv: 650, satisfaction_score: 6.8 },
      { customer_id: 'C005', age: 31, gender: 'F', location: 'New York', signup_date: '2023-02-05', ltv: 1450, satisfaction_score: 8.7 },
      { customer_id: 'C006', age: 38, gender: 'M', location: 'California', signup_date: '2023-01-25', ltv: 1800, satisfaction_score: 8.9 },
      { customer_id: 'C007', age: 26, gender: 'F', location: 'Texas', signup_date: '2023-03-15', ltv: 720, satisfaction_score: 7.5 },
      { customer_id: 'C008', age: 52, gender: 'M', location: 'Florida', signup_date: '2023-01-08', ltv: 2850, satisfaction_score: 9.3 },
    ]
  },
  {
    id: 'ecommerce-demo',
    name: 'E-commerce Transactions',
    description: 'Online store transactions with product details and customer behavior',
    icon: ShoppingCart,
    type: 'E-commerce',
    rows: 300,
    columns: ['transaction_id', 'customer_id', 'product_name', 'category', 'price', 'quantity', 'date'],
    data: [
      { transaction_id: 'T001', customer_id: 'C001', product_name: 'Wireless Headphones', category: 'Electronics', price: 199.99, quantity: 1, date: '2024-01-15' },
      { transaction_id: 'T002', customer_id: 'C002', product_name: 'Coffee Maker', category: 'Home & Kitchen', price: 89.99, quantity: 1, date: '2024-01-16' },
      { transaction_id: 'T003', customer_id: 'C003', product_name: 'Running Shoes', category: 'Sports', price: 129.99, quantity: 2, date: '2024-01-17' },
      { transaction_id: 'T004', customer_id: 'C001', product_name: 'Smartphone Case', category: 'Electronics', price: 24.99, quantity: 3, date: '2024-01-18' },
      { transaction_id: 'T005', customer_id: 'C004', product_name: 'Yoga Mat', category: 'Sports', price: 39.99, quantity: 1, date: '2024-01-19' },
      { transaction_id: 'T006', customer_id: 'C005', product_name: 'Bluetooth Speaker', category: 'Electronics', price: 79.99, quantity: 1, date: '2024-01-20' },
      { transaction_id: 'T007', customer_id: 'C002', product_name: 'Desk Lamp', category: 'Home & Kitchen', price: 45.99, quantity: 1, date: '2024-01-21' },
      { transaction_id: 'T008', customer_id: 'C003', product_name: 'Protein Powder', category: 'Health', price: 54.99, quantity: 2, date: '2024-01-22' },
    ]
  },
  {
    id: 'marketing-demo',
    name: 'Marketing Campaign Data',
    description: 'Digital marketing performance with campaign metrics and ROI',
    icon: TrendingUp,
    type: 'Marketing Analytics',
    rows: 120,
    columns: ['campaign_id', 'platform', 'budget', 'impressions', 'clicks', 'conversions', 'cost_per_click', 'roi'],
    data: [
      { campaign_id: 'C001', platform: 'Google Ads', budget: 5000, impressions: 150000, clicks: 4500, conversions: 225, cost_per_click: 1.11, roi: 4.2 },
      { campaign_id: 'C002', platform: 'Facebook', budget: 3500, impressions: 200000, clicks: 6000, conversions: 180, cost_per_click: 0.58, roi: 3.8 },
      { campaign_id: 'C003', platform: 'Instagram', budget: 2500, impressions: 95000, clicks: 2850, conversions: 142, cost_per_click: 0.88, roi: 5.1 },
      { campaign_id: 'C004', platform: 'LinkedIn', budget: 4000, impressions: 75000, clicks: 2250, conversions: 157, cost_per_click: 1.78, roi: 3.2 },
      { campaign_id: 'C005', platform: 'Twitter', budget: 1500, impressions: 45000, clicks: 1350, conversions: 54, cost_per_click: 1.11, roi: 2.8 },
    ]
  },
  {
    id: 'hr-demo',
    name: 'HR Analytics Data',
    description: 'Employee performance, satisfaction, and organizational metrics',
    icon: Users,
    type: 'Human Resources',
    rows: 180,
    columns: ['employee_id', 'department', 'position', 'salary', 'performance_score', 'satisfaction', 'tenure_years'],
    data: [
      { employee_id: 'E001', department: 'Engineering', position: 'Senior Developer', salary: 95000, performance_score: 8.5, satisfaction: 9.2, tenure_years: 3.5 },
      { employee_id: 'E002', department: 'Marketing', position: 'Marketing Manager', salary: 75000, performance_score: 7.8, satisfaction: 8.1, tenure_years: 2.1 },
      { employee_id: 'E003', department: 'Sales', position: 'Sales Representative', salary: 65000, performance_score: 9.1, satisfaction: 8.9, tenure_years: 1.8 },
      { employee_id: 'E004', department: 'Engineering', position: 'Junior Developer', salary: 68000, performance_score: 7.5, satisfaction: 8.7, tenure_years: 1.2 },
      { employee_id: 'E005', department: 'Finance', position: 'Financial Analyst', salary: 70000, performance_score: 8.2, satisfaction: 7.8, tenure_years: 4.2 },
    ]
  },
  {
    id: 'finance-demo',
    name: 'Financial Performance Data',
    description: 'Revenue, expenses, profit margins, and financial KPIs',
    icon: DollarSign,
    type: 'Financial Analytics',
    rows: 96,
    columns: ['month', 'revenue', 'expenses', 'profit', 'margin_percent', 'cash_flow', 'investments'],
    data: [
      { month: '2024-01', revenue: 850000, expenses: 620000, profit: 230000, margin_percent: 27.1, cash_flow: 195000, investments: 50000 },
      { month: '2024-02', revenue: 920000, expenses: 680000, profit: 240000, margin_percent: 26.1, cash_flow: 210000, investments: 75000 },
      { month: '2024-03', revenue: 1100000, expenses: 750000, profit: 350000, margin_percent: 31.8, cash_flow: 285000, investments: 100000 },
      { month: '2024-04', revenue: 980000, expenses: 695000, profit: 285000, margin_percent: 29.1, cash_flow: 245000, investments: 60000 },
      { month: '2024-05', revenue: 1050000, expenses: 720000, profit: 330000, margin_percent: 31.4, cash_flow: 275000, investments: 85000 },
    ]
  },
  {
    id: 'website-demo',
    name: 'Website Analytics Data',
    description: 'Web traffic, user behavior, and conversion analytics',
    icon: Globe,
    type: 'Web Analytics',
    rows: 365,
    columns: ['date', 'sessions', 'users', 'pageviews', 'bounce_rate', 'avg_session_duration', 'conversions'],
    data: [
      { date: '2024-01-01', sessions: 1250, users: 980, pageviews: 4200, bounce_rate: 0.35, avg_session_duration: 185, conversions: 45 },
      { date: '2024-01-02', sessions: 1380, users: 1120, pageviews: 4800, bounce_rate: 0.32, avg_session_duration: 205, conversions: 52 },
      { date: '2024-01-03', sessions: 1520, users: 1280, pageviews: 5400, bounce_rate: 0.29, avg_session_duration: 220, conversions: 68 },
      { date: '2024-01-04', sessions: 1450, users: 1180, pageviews: 5100, bounce_rate: 0.31, avg_session_duration: 195, conversions: 58 },
      { date: '2024-01-05', sessions: 1680, users: 1420, pageviews: 6200, bounce_rate: 0.28, avg_session_duration: 240, conversions: 78 },
    ]
  },
  {
    id: 'inventory-demo',
    name: 'Inventory Management Data',
    description: 'Stock levels, supplier data, and inventory optimization metrics',
    icon: Target,
    type: 'Supply Chain',
    rows: 240,
    columns: ['product_id', 'category', 'stock_level', 'reorder_point', 'supplier', 'cost', 'turnover_rate'],
    data: [
      { product_id: 'P001', category: 'Electronics', stock_level: 450, reorder_point: 100, supplier: 'TechSupply Co', cost: 25.50, turnover_rate: 12.5 },
      { product_id: 'P002', category: 'Home & Garden', stock_level: 280, reorder_point: 50, supplier: 'Garden Plus', cost: 15.75, turnover_rate: 8.2 },
      { product_id: 'P003', category: 'Sports', stock_level: 150, reorder_point: 25, supplier: 'SportGear Inc', cost: 45.00, turnover_rate: 15.8 },
      { product_id: 'P004', category: 'Electronics', stock_level: 85, reorder_point: 20, supplier: 'TechSupply Co', cost: 120.00, turnover_rate: 6.5 },
      { product_id: 'P005', category: 'Health', stock_level: 320, reorder_point: 75, supplier: 'Wellness Direct', cost: 32.25, turnover_rate: 10.1 },
    ]
  }
];

interface DemoDataLoaderProps {
  onDataLoaded?: () => void;
}

export function DemoDataLoader({ onDataLoaded }: DemoDataLoaderProps) {
  const [loadingDataset, setLoadingDataset] = useState<string | null>(null);
  const { toast } = useToast();

  const loadDemoData = async (dataset: typeof demoDatasets[0]) => {
    setLoadingDataset(dataset.id);

    try {
      // For demo purposes, create a mock user ID
      const mockUserId = 'demo-user-' + Date.now();

      // Create dataset record in database
      const { data: newDataset, error } = await supabase
        .from('datasets')
        .insert({
          user_id: mockUserId,
          name: dataset.name,
          description: dataset.description,
          file_type: 'demo',
          file_size: JSON.stringify(dataset.data).length,
          row_count: dataset.data.length,
          columns_info: {
            columns: dataset.columns,
            sample_data: dataset.data.slice(0, 3),
            full_data: dataset.data
          },
          status: 'ready'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Demo data loaded!",
        description: `${dataset.name} has been added to your datasets.`,
      });

      onDataLoaded?.();
    } catch (error) {
      console.error('Error loading demo data:', error);
      toast({
        title: "Error loading demo data",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoadingDataset(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Try Demo Data</CardTitle>
          <CardDescription>
            Load sample datasets to explore AnalystX features without uploading your own data
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demoDatasets.map((dataset) => {
          const Icon = dataset.icon;
          const isLoading = loadingDataset === dataset.id;

          return (
            <Card key={dataset.id} className="relative">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{dataset.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {dataset.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {dataset.description}
                </p>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{dataset.rows} rows</span>
                  <span>{dataset.columns.length} columns</span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Columns:</p>
                  <div className="flex flex-wrap gap-1">
                    {dataset.columns.slice(0, 4).map((column) => (
                      <Badge key={column} variant="outline" className="text-xs">
                        {column}
                      </Badge>
                    ))}
                    {dataset.columns.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{dataset.columns.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => loadDemoData(dataset)}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Load Demo Data
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}