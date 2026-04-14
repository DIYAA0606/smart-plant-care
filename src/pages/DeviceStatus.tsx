import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Battery, Wifi, Activity, Zap, CloudRain } from "lucide-react";

const DeviceStatus = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="pb-24">
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-card flex items-center justify-center border border-border">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold text-foreground">Device Status</h1>
        </div>

        <div className="px-5 space-y-4">
          {/* Battery */}
          <div className="bg-dark-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-dark-card-foreground font-semibold">Battery</h3>
              <Battery size={20} className="text-warning" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-warning/20 flex items-center justify-center">
                <div className="text-center">
                  <Zap size={16} className="text-warning mx-auto" />
                  <span className="text-xs font-bold text-warning">23%</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-dark-card-foreground">Low Battery!</p>
                <p className="text-xs text-dark-card-foreground/50">Plug in charger soon</p>
              </div>
            </div>
            <div className="mt-4 h-2 bg-dark-card-foreground/10 rounded-full overflow-hidden">
              <div className="h-full bg-warning rounded-full" style={{ width: "23%" }} />
            </div>
          </div>

          {/* Connectivity */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Wifi size={18} className="text-primary" />
              <h3 className="font-semibold text-foreground">Connectivity</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">WiFi</span>
                <span className="text-sm font-medium text-primary">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Sync</span>
                <span className="text-sm font-medium text-foreground">2 min ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Signal</span>
                <span className="text-sm font-medium text-primary">Strong</span>
              </div>
            </div>
          </div>

          {/* Sensors */}
          <div className="bg-card rounded-2xl p-5 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={18} className="text-primary" />
              <h3 className="font-semibold text-foreground">Sensors</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Soil Sensor</span>
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Temp Sensor</span>
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Weather API</span>
                <div className="flex items-center gap-1">
                  <CloudRain size={12} className="text-primary" />
                  <span className="text-xs font-medium text-primary">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default DeviceStatus;
