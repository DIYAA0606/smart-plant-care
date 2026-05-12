import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { CROPS } from "@/lib/crops";
import { useLanguage } from "@/hooks/use-language";
import { set, ref } from "firebase/database";
import { db } from "@/lib/firebase";
import { Loader2, Sprout } from "lucide-react";
import { Network } from "@capacitor/network";
import { SyncQueue } from "@/lib/sync-queue";

const CropSelectScreen = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    if (!selected) return;
    const crop = CROPS.find((c) => c.id === selected);
    if (!crop) return;

    setSaving(true);
    try {
      const netStatus = await Network.getStatus();
      if (netStatus.connected) {
        await set(ref(db, "/plant/type"), crop.id);
        await set(ref(db, "/plant/threshold"), crop.threshold);
      } else {
        await SyncQueue.enqueueAction("CROP_SELECT", { type: crop.id, threshold: crop.threshold });
      }
      localStorage.setItem("selectedCrop", crop.id);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Failed to save crop:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen px-5 py-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Sprout size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{t("select_crop")}</h1>
            <p className="text-xs text-muted-foreground">{t("select_crop_desc")}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6 flex-1">
          {CROPS.map((crop) => {
            const isSelected = selected === crop.id;
            return (
              <button
                key={crop.id}
                onClick={() => setSelected(crop.id)}
                className={`relative rounded-2xl p-4 border-2 transition-all text-left flex flex-col items-center gap-2 ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
                <img
                  src={crop.image}
                  alt={t(crop.nameKey)}
                  width={80}
                  height={80}
                  className="object-contain"
                />
                <span className="text-sm font-semibold text-foreground">{t(crop.nameKey)}</span>
                <span className="text-[10px] text-muted-foreground">
                  Threshold: {crop.threshold}%
                </span>
              </button>
            );
          })}
        </div>

        <Button
          onClick={handleContinue}
          disabled={!selected || saving}
          className="h-12 rounded-xl text-base font-semibold mt-6 gap-2"
        >
          {saving && <Loader2 size={18} className="animate-spin" />}
          {t("continue")}
        </Button>
      </div>
    </MobileLayout>
  );
};

export default CropSelectScreen;
