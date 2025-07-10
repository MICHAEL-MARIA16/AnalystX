
import { AppLayout } from "@/components/layout/AppLayout";
import { ReportsDashboard } from "@/components/reports/ReportsDashboard";

export default function Reports() {
  return (
    <AppLayout title="Reports" description="Create, schedule, and manage automated reports">
      <ReportsDashboard />
    </AppLayout>
  );
}
