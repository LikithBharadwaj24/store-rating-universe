import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StarRating } from "@/components/StarRating";
import { useUser } from "@/components/UserContext";
import { mockStores, mockRatings } from "@/data/mockData";
import { Search, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UserDashboard() {
  const { user, logout } = useUser();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  if (!user || user.role !== "user") {
    return <div>Access denied</div>;
  }

  const getUserRating = (storeId: string) => {
    const userRating = mockRatings.find(r => r.userId === user.id && r.storeId === storeId);
    return userRating?.rating || 0;
  };

  const handleRateStore = (storeId: string, rating: number) => {
    toast({
      title: "Rating submitted!",
      description: `You rated this store ${rating} stars`,
    });
  };

  const filteredStores = mockStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Store Directory" onLogout={logout} userRole="Customer">
      <div className="space-y-6">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search stores by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Store Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStores.map((store) => {
            const userRating = getUserRating(store.id);
            
            return (
              <Card key={store.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{store.name}</CardTitle>
                  <CardDescription className="flex items-start gap-1">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    {store.address}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Overall Rating */}
                  <div>
                    <p className="text-sm font-medium mb-2">Overall Rating</p>
                    <div className="flex items-center gap-2">
                      <StarRating rating={store.rating} readonly />
                      <span className="text-sm text-muted-foreground">
                        {store.rating.toFixed(1)} ({store.totalRatings} reviews)
                      </span>
                    </div>
                  </div>

                  {/* User's Rating */}
                  <div>
                    <p className="text-sm font-medium mb-2">Your Rating</p>
                    {userRating > 0 ? (
                      <div className="flex items-center gap-2">
                        <StarRating 
                          rating={userRating} 
                          onRatingChange={(rating) => handleRateStore(store.id, rating)}
                        />
                        <Badge variant="secondary">Rated</Badge>
                      </div>
                    ) : (
                      <StarRating 
                        rating={0} 
                        onRatingChange={(rating) => handleRateStore(store.id, rating)}
                      />
                    )}
                  </div>

                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredStores.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No stores found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}