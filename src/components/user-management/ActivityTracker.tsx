
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Activity, Clock, TrendingUp } from "lucide-react";

export function ActivityTracker() {
  const userActivity = [
    {
      user: "Alice Johnson",
      email: "alice@company.com",
      lastLogin: "2024-01-07 14:30",
      sessionDuration: "2h 45m",
      queriesRun: 23,
      reportsViewed: 8,
      status: "active"
    },
    {
      user: "Bob Smith", 
      email: "bob@company.com",
      lastLogin: "2024-01-07 09:15",
      sessionDuration: "1h 20m",
      queriesRun: 12,
      reportsViewed: 5,
      status: "active"
    },
    {
      user: "Carol Davis",
      email: "carol@company.com", 
      lastLogin: "2024-01-05 16:45",
      sessionDuration: "0h 35m",
      queriesRun: 3,
      reportsViewed: 2,
      status: "inactive"
    }
  ];

  const getActivityLevel = (queries: number) => {
    if (queries > 20) return { level: "High", variant: "default" as const };
    if (queries > 10) return { level: "Medium", variant: "secondary" as const };
    return { level: "Low", variant: "outline" as const };
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">12</span>
              <Activity className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Currently online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">1h 42m</span>
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Today's average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">347</span>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Activity Overview</CardTitle>
          <CardDescription>
            Monitor user engagement and platform usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h4 className="font-medium">{activity.user}</h4>
                    <p className="text-sm text-muted-foreground">{activity.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        Last seen: {activity.lastLogin}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium">{activity.sessionDuration}</div>
                    <div className="text-muted-foreground">Session</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="font-medium">{activity.queriesRun}</div>
                    <div className="text-muted-foreground">Queries</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="font-medium">{activity.reportsViewed}</div>
                    <div className="text-muted-foreground">Reports</div>
                  </div>

                  <Badge variant={getActivityLevel(activity.queriesRun).variant}>
                    {getActivityLevel(activity.queriesRun).level}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
