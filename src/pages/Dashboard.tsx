import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import BottomNav from "@/components/BottomNav";
import plantImg from "@/assets/plant-ficus.png";
import { Bell, Droplets, Thermometer, Wind, ChevronRight, Zap, MapPin, Loader2, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlantData } from "@/hooks/use-plant-data";
import { useLocation } from "@/hooks/use-location";

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";
  const { data, loading, error } = usePlantData();
  const location = useLocation();

  const stats = [
    { icon: Droplets, label: "Moisture", value: data.moisture != null ? `${data.moisture}%` : "--", color: "text-info" },
    { icon: Thermometer, label: "Temp", value: data.temperature != null ? `${data.temperature}°C` : "--", color: "text-destructive" },
    { icon: Wind, label: "Humidity", value: data.humidity != null ? `${data.humidity}%` : "--", color: "text-primary" },
  ];

  const pumpIsOn = data.pump === "ON";

  return (
    <MobileLayout>
      <div className="px-5 pt-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-muted-foreground text-sm">Hello,</p>
            <h1 className="text-xl font-bold text-foreground">{userName} 👋</h1>
          </div>
          <button
            onClick={() => navigate("/notifications")}
            className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-sm border border-border relative"
          >
            <Bell size={18} className="text-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-destructive/10 text-destructive text-xs font-medium rounded-xl px-4 py-2.5 mb-4 border border-destructive/20">
            ⚠️ {error}
          </div>
        )}

        {/* Plant Card */}
        <div
          onClick={() => navigate("/plant-details")}
          className="bg-dark-card rounded-2xl p-5 mb-5 cursor-pointer relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-dark-card-foreground mb-1">Ficus</h2>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
                  {loading ? "Loading..." : "Healthy"}
                </span>
                {data.pump != null && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${
                    pumpIsOn ? "bg-info/20 text-info" : "bg-muted text-muted-foreground"
                  }`}>
                    <Power size={10} />
                    Pump {data.pump}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-dark-card-foreground/60 text-xs">
                <Droplets size={12} />
                <span>Moisture: {data.moisture != null ? `${data.moisture}%` : "--"}</span>
              </div>
            </div>
            <img src={plantImg} alt="Ficus" width={120} height={150} className="object-contain -mr-2" />
          </div>
          <div className="mt-4 h-1.5 bg-dark-card-foreground/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${data.moisture ?? 0}%` }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-card rounded-xl p-3.5 text-center shadow-sm border border-border">
              <Icon size={20} className={`${color} mx-auto mb-1.5`} />
              {loading ? (
                <Loader2 size={18} className="mx-auto mb-1 animate-spin text-muted-foreground" />
              ) : (
                <p className="text-lg font-bold text-foreground">{value}</p>
              )}
              <p className="text-[10px] text-muted-foreground font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Location Card */}
        <div className="bg-card rounded-xl p-3.5 mb-6 border border-border">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <span className="text-xs font-medium text-foreground">Location</span>
          </div>
          {location.loading ? (
            <div className="flex items-center gap-2 mt-2">
              <Loader2 size={14} className="animate-spin text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Getting location...</span>
            </div>
          ) : location.error ? (
            <p className="text-xs text-destructive mt-1.5">{location.error}</p>
          ) : (
            <p className="text-xs text-muted-foreground mt-1.5">
              📍 {location.latitude?.toFixed(4)}, {location.longitude?.toFixed(4)}
            </p>
          )}
        </div>

        {/* Action Button */}
        <Button
          onClick={() => navigate("/actions")}
          className="w-full h-12 rounded-xl text-base font-semibold mb-6 gap-2"
        >
          <Zap size={18} />
          Take Action
          <ChevronRight size={16} />
        </Button>

        {/* Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
            <button onClick={() => navigate("/history")} className="text-primary text-xs font-medium">
              See all
            </button>
          </div>
          <div className="space-y-3">
            {[
              { action: "Watered plant", time: "3 days ago", date: "10.02" },
              { action: "Added fertilizer", time: "5 days ago", date: "19.02" },
              { action: "Adjusted light", time: "1 week ago", date: "17.03" },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Droplets size={14} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
                <span className="text-xs text-muted-foreground">{a.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default Dashboard;
