import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Droplets, Leaf, Sun, Zap, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const recommended = [
  { id: "water", icon: Droplets, title: "Put 1 glass of water", desc: "Recommended" },
  { id: "fertilizer", icon: Leaf, title: "Put 50 gm of fertilizer", desc: "Monthly" },
  { id: "light", icon: Sun, title: "Increase the light", desc: "3 hours/day" },
  { id: "charge", icon: Zap, title: "Plug in a charger", desc: "Battery low" },
];

const ActionsScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const confirm = () => {
    if (selected.length === 0) {
      toast({ title: "Select actions", description: "Please select at least one action", variant: "destructive" });
      return;
    }
    toast({ title: "Actions sent! ✅", description: `${selected.length} action(s) sent to device` });
    setSelected([]);
  };

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
          <p className="text-xs text-dark-card-foreground/50 font-medium uppercase tracking-wider mb-3">Recommended</p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {recommended.map(({ id, icon: Icon, title, desc }) => {
              const isSelected = selected.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => toggle(id)}
                  className={`relative p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-primary/10 border-primary"
                      : "bg-dark-card-foreground/5 border-dark-card-foreground/10"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check size={12} className="text-primary-foreground" />
                    </div>
                  )}
                  <Icon size={20} className={isSelected ? "text-primary" : "text-dark-card-foreground/60"} />
                  <p className="text-sm font-medium text-dark-card-foreground mt-2">{title}</p>
                  <p className="text-[10px] text-dark-card-foreground/40 mt-0.5">{desc}</p>
                </button>
              );
            })}
          </div>

          <Button onClick={confirm} className="w-full h-12 rounded-xl text-base font-semibold gap-2">
            Confirm Actions
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default ActionsScreen;
