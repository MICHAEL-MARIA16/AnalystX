
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, Users, Eye, Settings } from "lucide-react";

export function RoleManagement() {
  const roles = [
    {
      name: "Admin",
      description: "Full system access and user management",
      userCount: 2,
      permissions: {
        viewReports: true,
        createReports: true,
        manageUsers: true,
        systemSettings: true,
        dataAccess: "All datasets",
        exportData: true
      }
    },
    {
      name: "Analyst", 
      description: "Data analysis and report creation",
      userCount: 8,
      permissions: {
        viewReports: true,
        createReports: true,
        manageUsers: false,
        systemSettings: false,
        dataAccess: "Assigned datasets",
        exportData: true
      }
    },
    {
      name: "Viewer",
      description: "Read-only access to reports and dashboards",
      userCount: 15,
      permissions: {
        viewReports: true,
        createReports: false,
        manageUsers: false,
        systemSettings: false,
        dataAccess: "Public reports only",
        exportData: false
      }
    }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin": return <Shield className="h-5 w-5 text-red-500" />;
      case "Analyst": return <Settings className="h-5 w-5 text-blue-500" />;
      case "Viewer": return <Eye className="h-5 w-5 text-green-500" />;
      default: return <Users className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {roles.map((role, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getRoleIcon(role.name)}
              {role.name}
              <Badge variant="outline">{role.userCount} users</Badge>
            </CardTitle>
            <CardDescription>
              {role.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium">System Permissions</h4>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor={`${role.name}-view`}>View Reports</Label>
                  <Switch 
                    id={`${role.name}-view`}
                    checked={role.permissions.viewReports}
                    disabled
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor={`${role.name}-create`}>Create Reports</Label>
                  <Switch 
                    id={`${role.name}-create`}
                    checked={role.permissions.createReports}
                    disabled
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor={`${role.name}-users`}>Manage Users</Label>
                  <Switch 
                    id={`${role.name}-users`}
                    checked={role.permissions.manageUsers}
                    disabled
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor={`${role.name}-settings`}>System Settings</Label>
                  <Switch 
                    id={`${role.name}-settings`}
                    checked={role.permissions.systemSettings}
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Data Access</h4>
                
                <div className="space-y-2">
                  <Label>Dataset Access Level</Label>
                  <Badge variant="outline" className="block w-fit">
                    {role.permissions.dataAccess}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor={`${role.name}-export`}>Export Data</Label>
                  <Switch 
                    id={`${role.name}-export`}
                    checked={role.permissions.exportData}
                    disabled
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
