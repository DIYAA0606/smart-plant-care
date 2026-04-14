import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import logoImg from "@/assets/logo.png";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      navigate(isLoggedIn ? "/dashboard" : "/login", { replace: true });
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileLayout>
      <div className="flex flex-col items-center justify-center min-h-screen px-8">
        <div className="animate-fade-in flex flex-col items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-accent flex items-center justify-center shadow-lg">
            <img src={logoImg} alt="SmartGrow" width={64} height={64} />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">SmartGrow</h1>
            <p className="text-muted-foreground text-sm mt-1">Intelligent Plant Care</p>
          </div>
        </div>
        <div className="absolute bottom-20 w-48">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-pulse-green" style={{ width: "60%" }} />
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SplashScreen;
