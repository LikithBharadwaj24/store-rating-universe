import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StarRating } from "@/components/StarRating";
import { useUser } from "@/components/UserContext";
import { mockStores, mockRatings, mockUsers } from "@/data/mockData";
import { TrendingUp, Users, Star } from "lucide-react";

export default function StoreOwnerDashboard() {
  const { user, logout } = useUser();

  if (!user || user.role !== "store_owner") {
    return <div>Access denied</div>;
  }

  // Find the store owned by this user
  const ownedStore = mockStores.find(store => store.ownerId === user.id);
  
  if (!ownedStore) {
    return (
      <DashboardLayout title="Store Dashboard" onLogout={logout} userRole="Store Owner">
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No store found for this account.</p>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  // Get ratings for this store
  const storeRatings = mockRatings.filter(rating => rating.storeId === ownedStore.id);
  
  // Get users who rated this store
  const ratingUsers = storeRatings.map(rating => {
    const ratingUser = mockUsers.find(u => u.id === rating.userId);
    return {
      ...rating,
      userName: ratingUser?.name || "Unknown User",
      userEmail: ratingUser?.email || "unknown@email.com"
    };
  });

  return (
    <DashboardLayout title={`${ownedStore.name} Dashboard`} onLogout={logout} userRole="Store Owner">
      <div className="space-y-6">
        {/* Store Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">{ownedStore.rating.toFixed(1)}</span>
                <StarRating rating={ownedStore.rating} readonly size="sm" />
              </div>
              <p className="text-xs text-muted-foreground">Out of 5 stars</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Ratings</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{ownedStore.totalRatings}</div>
              <p className="text-xs text-muted-foreground">Customer reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating Trend</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">+2.5%</div>
              <p className="text-xs text-muted-foreground">vs last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Store Info */}
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
            <CardDescription>Your store details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Store Name</p>
                <p className="text-base">{ownedStore.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-base">{ownedStore.email}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Address</p>
                <p className="text-base">{ownedStore.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Ratings */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Ratings</CardTitle>
            <CardDescription>Recent ratings from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            {ratingUsers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ratingUsers.map((rating) => (
                    <TableRow key={rating.id}>
                      <TableCell className="font-medium">{rating.userName}</TableCell>
                      <TableCell>{rating.userEmail}</TableCell>
                      <TableCell>
                        <StarRating rating={rating.rating} readonly size="sm" />
                      </TableCell>
                      <TableCell>{rating.createdAt.toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No ratings yet. Encourage customers to rate your store!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}