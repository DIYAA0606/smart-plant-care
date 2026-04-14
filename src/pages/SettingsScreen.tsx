import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, User, Bell, Smartphone, LogOut, ChevronRight, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const SettingsScreen = () => {
  const navigate = useNavigate();
  const [notifEnabled, setNotifEnabled] = useState(true);
  const userName = localStorage.getItem("userName") || "User";

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    navigate("/login", { replace: true });
  };

  return (
    <MobileLayout>
      <div className="pb-24">
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-card flex items-center justify-center border border-border">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold text-foreground">Settings</h1>
        </div>

        <div className="px-5 space-y-4">
          {/* User */}
          <div className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">user@example.com</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>

          {/* Notifications */}
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                  <Bell size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">Notifications</span>
              </div>
              <Switch checked={notifEnabled} onCheckedChange={setNotifEnabled} />
            </div>
          </div>

          {/* Device */}
          <button
            onClick={() => navigate("/device-status")}
            className="w-full bg-card rounded-2xl p-4 border border-border flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                <Smartphone size={16} className="text-primary" />
              </div>
              <div className="text-left">
                <span className="text-sm font-medium text-foreground block">Device</span>
                <span className="text-xs text-muted-foreground">ESP32 Connected</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>

          {/* Privacy */}
          <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                <Shield size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">Privacy & Security</span>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full bg-destructive/10 rounded-2xl p-4 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center">
              <LogOut size={16} className="text-destructive" />
            </div>
            <span className="text-sm font-medium text-destructive">Logout</span>
          </button>
        </div>
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default SettingsScreen;
