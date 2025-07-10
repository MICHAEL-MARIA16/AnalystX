
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { UserPlus, Search, MoreHorizontal, Mail, Ban, Shield } from "lucide-react";

export function UserList() {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@company.com",
      role: "Admin",
      status: "active",
      lastLogin: "2024-01-07 14:30",
      usage: "High"
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@company.com",
      role: "Analyst",
      status: "active",
      lastLogin: "2024-01-07 09:15",
      usage: "Medium"
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol@company.com",
      role: "Viewer",
      status: "inactive",
      lastLogin: "2024-01-05 16:45",
      usage: "Low"
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david@company.com",
      role: "Analyst",
      status: "active",
      lastLogin: "2024-01-07 11:20",
      usage: "High"
    }
  ];

  const getStatusColor = (status: string) => {
    return status === "active" ? "default" : "secondary";
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "destructive";
      case "Analyst": return "default";
      case "Viewer": return "secondary";
      default: return "outline";
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage user access and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h4 className="font-medium">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        Last login: {user.lastLogin}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {user.usage} usage
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                  <Badge variant={getRoleColor(user.role)}>
                    {user.role}
                  </Badge>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Invite
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="h-4 w-4 mr-2" />
                        Change Role
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Ban className="h-4 w-4 mr-2" />
                        Disable User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
