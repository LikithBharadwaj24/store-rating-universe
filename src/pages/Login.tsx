import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/AuthLayout";
import { useUser } from "@/components/UserContext";
import { mockUsers } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock authentication - find user by email
    const user = mockUsers.find(u => u.email === email);
    
    if (user && password === "Password123!") {
      login(user);
      toast({
        title: "Login successful!",
        description: `Welcome back, ${user.name}`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      description="Sign in to your StoreRater account"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>Demo credentials:</p>
        <p>admin@example.com / Password123!</p>
        <p>jane@example.com / Password123!</p>
        <p>bob@storeowner.com / Password123!</p>
      </div>
    </AuthLayout>
  );
}