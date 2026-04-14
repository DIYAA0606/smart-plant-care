import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Droplets, Leaf, Sun, Zap, Power, PowerOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePlantData } from "@/hooks/use-plant-data";

const ActionsScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data, setPump } = usePlantData();
  const [pumpLoading, setPumpLoading] = useState(false);

  const pumpIsOn = data.pump === "ON";

  const handlePump = async (status: "ON" | "OFF") => {
    setPumpLoading(true);
    try {
      await setPump(status);
      toast({
        title: status === "ON" ? "Pump Started 💧" : "Pump Stopped ⏹️",
        description: `Pump has been turned ${status}`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update pump. Check your connection.",
        variant: "destructive",
      });
    } finally {
      setPumpLoading(false);
    }
  };

  const recommended = [
    { id: "water", icon: Droplets, title: "Put 1 glass of water", desc: "Recommended" },
    { id: "fertilizer", icon: Leaf, title: "Put 50 gm of fertilizer", desc: "Monthly" },
    { id: "light", icon: Sun, title: "Increase the light", desc: "3 hours/day" },
    { id: "charge", icon: Zap, title: "Plug in a charger", desc: "Battery low" },
  ];

  return (
    <MobileLayout>
      <div className="pb-24 bg-dark-card min-h-screen">
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-dark-card-foreground/10 flex items-center justify-center">
            <ArrowLeft size={18} className="text-dark-card-foreground" />
          </button>
          <h1 className="text-lg font-bold text-dark-card-foreground">Actions</h1>
        </div>

        <div className="px-5">
          {/* Pump Control */}
          <p className="text-xs text-dark-card-foreground/50 font-medium uppercase tracking-wider mb-3">Pump Control</p>
          <div className="bg-dark-card-foreground/5 rounded-xl border border-dark-card-foreground/10 p-4 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${pumpIsOn ? "bg-info/20" : "bg-muted"}`}>
                <Power size={20} className={pumpIsOn ? "text-info" : "text-muted-foreground"} />
              </div>
              <div>
                <p className="text-sm font-semibold text-dark-card-foreground">Pump Status</p>
                <p className={`text-xs font-medium ${pumpIsOn ? "text-info" : "text-muted-foreground"}`}>
                  {data.pump ?? "Unknown"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handlePump("ON")}
                disabled={pumpLoading || pumpIsOn}
                className="h-11 rounded-xl gap-2 bg-info hover:bg-info/90 text-info-foreground"
              >
                {pumpLoading ? <Loader2 size={16} className="animate-spin" /> : <Power size={16} />}
                Start Watering
              </Button>
              <Button
                onClick={() => handlePump("OFF")}
                disabled={pumpLoading || !pumpIsOn}
                variant="outline"
                className="h-11 rounded-xl gap-2 border-dark-card-foreground/20 text-dark-card-foreground"
              >
                {pumpLoading ? <Loader2 size={16} className="animate-spin" /> : <PowerOff size={16} />}
                Stop Watering
              </Button>
            </div>
          </div>

          {/* Recommended */}
          <p className="text-xs text-dark-card-foreground/50 font-medium uppercase tracking-wider mb-3">Recommended</p>
          <div className="grid grid-cols-2 gap-3">
            {recommended.map(({ id, icon: Icon, title, desc }) => (
              <div
                key={id}
                className="p-4 rounded-xl border bg-dark-card-foreground/5 border-dark-card-foreground/10 text-left"
              >
                <Icon size={20} className="text-dark-card-foreground/60" />
                <p className="text-sm font-medium text-dark-card-foreground mt-2">{title}</p>
                <p className="text-[10px] text-dark-card-foreground/40 mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default ActionsScreen;
