
import { AppLayout } from "@/components/layout/AppLayout";
import { UserManagementDashboard } from "@/components/user-management/UserManagementDashboard";

export default function UserManagement() {
  return (
    <AppLayout title="User Management" description="Manage users, roles, and access permissions">
      <UserManagementDashboard />
    </AppLayout>
  );
}
