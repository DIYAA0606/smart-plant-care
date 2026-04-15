import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Power, PowerOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePlantData } from "@/hooks/use-plant-data";
import { useLanguage } from "@/hooks/use-language";

const ActionsScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data, setPump } = usePlantData();
  const { t } = useLanguage();
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

  const threshold = data.threshold ?? 50;
  const needsWater = data.moisture != null && data.moisture < threshold;

  return (
    <MobileLayout>
      <div className="pb-24 bg-dark-card min-h-screen">
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-dark-card-foreground/10 flex items-center justify-center">
            <ArrowLeft size={18} className="text-dark-card-foreground" />
          </button>
          <h1 className="text-lg font-bold text-dark-card-foreground">{t("actions")}</h1>
        </div>

        <div className="px-5">
          {/* Smart Suggestion */}
          {data.moisture != null && (
            <div className={`rounded-xl px-4 py-3 mb-5 border ${
              needsWater
                ? "bg-warning/10 border-warning/30"
                : "bg-primary/10 border-primary/30"
            }`}>
              <p className="text-sm font-semibold text-dark-card-foreground">
                {needsWater ? t("water_required") : t("no_water_needed")}
              </p>
              <p className="text-xs text-dark-card-foreground/60 mt-0.5">
                {t("moisture")}: {data.moisture}% / Threshold: {threshold}%
              </p>
            </div>
          )}

          {/* Pump Control */}
          <p className="text-xs text-dark-card-foreground/50 font-medium uppercase tracking-wider mb-3">{t("pump_control")}</p>
          <div className="bg-dark-card-foreground/5 rounded-xl border border-dark-card-foreground/10 p-4 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${pumpIsOn ? "bg-info/20" : "bg-muted"}`}>
                <Power size={20} className={pumpIsOn ? "text-info" : "text-muted-foreground"} />
              </div>
              <div>
                <p className="text-sm font-semibold text-dark-card-foreground">{t("pump_status")}</p>
                <p className={`text-xs font-medium ${pumpIsOn ? "text-info" : "text-muted-foreground"}`}>
                  {data.pump ?? "Unknown"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handlePump("ON")}
                disabled={pumpLoading}
                className={`h-11 rounded-xl gap-2 ${
                  pumpIsOn
                    ? "bg-info/30 text-info border border-info/40"
                    : "bg-info hover:bg-info/90 text-info-foreground"
                }`}
              >
                {pumpLoading ? <Loader2 size={16} className="animate-spin" /> : <Power size={16} />}
                {t("start_watering")}
              </Button>
              <Button
                onClick={() => handlePump("OFF")}
                disabled={pumpLoading}
                variant="outline"
                className={`h-11 rounded-xl gap-2 ${
                  !pumpIsOn
                    ? "bg-destructive/10 text-destructive border-destructive/30"
                    : "border-dark-card-foreground/20 text-dark-card-foreground"
                }`}
              >
                {pumpLoading ? <Loader2 size={16} className="animate-spin" /> : <PowerOff size={16} />}
                {t("stop_watering")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default ActionsScreen;
