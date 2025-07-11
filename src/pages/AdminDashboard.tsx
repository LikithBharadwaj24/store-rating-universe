import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StarRating } from "@/components/StarRating";
import { useUser } from "@/components/UserContext";
import { mockUsers, mockStores, mockRatings } from "@/data/mockData";
import { Users, Store, Star, Search, Plus } from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "stores">("overview");

  if (!user || user.role !== "admin") {
    return <div>Access denied</div>;
  }

  const totalUsers = mockUsers.length;
  const totalStores = mockStores.length;
  const totalRatings = mockRatings.length;

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStores = mockStores.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Admin Dashboard" onLogout={logout} userRole="System Administrator">
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex gap-2">
          <Button 
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </Button>
          <Button 
            variant={activeTab === "users" ? "default" : "outline"}
            onClick={() => setActiveTab("users")}
          >
            Users
          </Button>
          <Button 
            variant={activeTab === "stores" ? "default" : "outline"}
            onClick={() => setActiveTab("stores")}
          >
            Stores
          </Button>
        </div>

        {activeTab === "overview" && (
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{totalUsers}</div>
                <p className="text-xs text-muted-foreground">Registered users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{totalStores}</div>
                <p className="text-xs text-muted-foreground">Registered stores</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Ratings</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{totalRatings}</div>
                <p className="text-xs text-muted-foreground">Submitted ratings</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add User
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Users Management</CardTitle>
                <CardDescription>Manage all registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                            {user.role.replace("_", " ")}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "stores" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search stores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Store
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Stores Management</CardTitle>
                <CardDescription>Manage all registered stores</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStores.map((store) => (
                      <TableRow key={store.id}>
                        <TableCell className="font-medium">{store.name}</TableCell>
                        <TableCell>{store.email}</TableCell>
                        <TableCell>{store.address}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <StarRating rating={store.rating} readonly />
                            <span className="text-sm text-muted-foreground">
                              ({store.totalRatings})
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}