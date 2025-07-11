import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/components/UserContext";

const Index = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "user":
          navigate("/user");
          break;
        case "store_owner":
          navigate("/store-owner");
          break;
        default:
          navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-primary">Loading...</h1>
      </div>
    </div>
  );
};

export default Index;
