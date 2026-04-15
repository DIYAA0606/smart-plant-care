import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Droplets, AlertTriangle, CheckCircle2, Power } from "lucide-react";
import { usePlantData } from "@/hooks/use-plant-data";
import { useLanguage } from "@/hooks/use-language";

const NotificationsScreen = () => {
  const navigate = useNavigate();
  const { data } = usePlantData();
  const { t } = useLanguage();

  const threshold = data.threshold ?? 50;
  const moistureLow = data.moisture != null && data.moisture < threshold;
  const pumpOff = data.pump === "OFF" || data.pump == null;
  const pumpOn = data.pump === "ON";

  interface Notification {
    id: string;
    icon: typeof Droplets;
    title: string;
    desc: string;
    time: string;
    type: "warning" | "info" | "success";
  }

  const notifications: Notification[] = [];

  if (moistureLow) {
    notifications.push({
      id: "low-moisture",
      icon: Droplets,
      title: t("water_plant_alert"),
      desc: `${t("moisture_low_desc")} (${data.moisture}% / ${threshold}%)`,
      time: t("now"),
      type: "warning",
    });
  }

  if (moistureLow && pumpOff) {
    notifications.push({
      id: "pump-off-alert",
      icon: AlertTriangle,
      title: t("pump_off_alert"),
      desc: t("pump_off_low_moisture"),
      time: t("now"),
      type: "warning",
    });
  }

  if (pumpOn) {
    notifications.push({
      id: "pump-running",
      icon: Power,
      title: t("pump_running"),
      desc: t("pump_running_desc"),
      time: t("now"),
      type: "info",
    });
  }

  if (!moistureLow && data.moisture != null) {
    notifications.push({
      id: "all-good",
      icon: CheckCircle2,
      title: t("all_good"),
      desc: t("all_good_desc"),
      time: t("now"),
      type: "success",
    });
  }

  const typeStyles = {
    warning: "bg-warning/10 border-warning/30",
    info: "bg-info/10 border-info/30",
    success: "bg-primary/10 border-primary/30",
  };

  const iconStyles = {
    warning: "bg-warning/20 text-warning",
    info: "bg-info/20 text-info",
    success: "bg-primary/20 text-primary",
  };

  return (
    <MobileLayout>
      <div className="pb-24">
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-card flex items-center justify-center border border-border">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold text-foreground">{t("notifications")}</h1>
        </div>

        <div className="px-5 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle2 size={40} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">{t("no_notifications")}</p>
            </div>
          ) : (
            notifications.map((n) => {
              const Icon = n.icon;
              return (
                <button
                  key={n.id}
                  onClick={() => navigate("/actions")}
                  className={`w-full flex items-start gap-3 p-4 rounded-xl border transition-colors text-left ${typeStyles[n.type]}`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${iconStyles[n.type]}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">{n.title}</p>
                      <span className="text-[10px] text-muted-foreground ml-2 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default NotificationsScreen;
