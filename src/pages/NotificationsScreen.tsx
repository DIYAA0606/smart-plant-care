import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Droplets, Sun, Zap, Leaf } from "lucide-react";

const initialNotifications = [
  { id: 1, icon: Sun, title: "Add some light", desc: "Your plant needs more sunlight", time: "Tomorrow", read: false },
  { id: 2, icon: Droplets, title: "Water your plant", desc: "Moisture level is getting low", time: "1 day ago", read: false },
  { id: 3, icon: Leaf, title: "Add fertilizer", desc: "Time for monthly fertilizing", time: "2 days ago", read: true },
  { id: 4, icon: Droplets, title: "Water your plant", desc: "Regular watering schedule", time: "3 days ago", read: true },
  { id: 5, icon: Zap, title: "Fertilizer needed", desc: "NPK levels are low", time: "17.03", read: true },
];

const NotificationsScreen = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <MobileLayout>
      <div className="pb-24">
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-card flex items-center justify-center border border-border">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold text-foreground">Notifications</h1>
        </div>

        <div className="px-5 space-y-2">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <button
                key={n.id}
                onClick={() => { markAsRead(n.id); navigate("/actions"); }}
                className={`w-full flex items-start gap-3 p-4 rounded-xl border transition-colors text-left ${
                  n.read ? "bg-card border-border" : "bg-accent border-primary/20"
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  n.read ? "bg-muted" : "bg-primary/10"
                }`}>
                  <Icon size={16} className={n.read ? "text-muted-foreground" : "text-primary"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${n.read ? "text-foreground" : "text-foreground"}`}>{n.title}</p>
                    <span className="text-[10px] text-muted-foreground ml-2 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                </div>
                {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
              </button>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default NotificationsScreen;
