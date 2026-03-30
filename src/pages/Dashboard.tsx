import { Link } from "react-router-dom";
import { CalendarDays, Users, TrendingUp, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Today's Bookings", value: "12", icon: CalendarDays },
  { label: "Active Clients", value: "248", icon: Users },
  { label: "Revenue (MTD)", value: "$8,420", icon: TrendingUp },
];

const Dashboard = () => {
  // TODO: Replace with Supabase auth check
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <h1 className="font-display text-xl font-bold">Dashboard</h1>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-display font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-display">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Connect to your backend to display real appointment data here.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
