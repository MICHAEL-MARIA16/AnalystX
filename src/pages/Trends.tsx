
import { AppLayout } from "@/components/layout/AppLayout";
import { TrendsDashboard } from "@/components/trends/TrendsDashboard";

export default function Trends() {
  return (
    <AppLayout title="Trends" description="Analyze long-term patterns and seasonal trends">
      <TrendsDashboard />
    </AppLayout>
  );
}
