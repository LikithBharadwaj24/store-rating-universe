import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Store, Users, Star } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  onLogout: () => void;
  userRole: string;
}

export function DashboardLayout({ children, title, onLogout, userRole }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Store className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-primary">StoreRater</h1>
              <p className="text-sm text-muted-foreground">{userRole}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        </div>
        {children}
      </main>
    </div>
  );
}