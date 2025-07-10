
import { AppLayout } from "@/components/layout/AppLayout";
import { SystemSettingsDashboard } from "@/components/system-settings/SystemSettingsDashboard";

export default function SystemSettings() {
  return (
    <AppLayout title="System Settings" description="Configure system preferences and integrations">
      <SystemSettingsDashboard />
    </AppLayout>
  );
}
