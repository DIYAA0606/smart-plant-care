import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Droplets, Thermometer, Wind, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { usePlantData } from "@/hooks/use-plant-data";
import { useLanguage } from "@/hooks/use-language";
import { getCropById } from "@/lib/crops";
import plantFallback from "@/assets/plant-ficus.png";

const moistureData = [
  { date: "1.01", value: 55 }, { date: "7.01", value: 60 }, { date: "14.01", value: 52 },
  { date: "21.01", value: 68 }, { date: "1.02", value: 65 }, { date: "7.02", value: 72 },
];

const heightData = [
  { date: "1.01", value: 14.2 }, { date: "7.01", value: 15.6 }, { date: "14.01", value: 16.8 },
  { date: "21.01", value: 18.6 }, { date: "1.02", value: 19.2 }, { date: "7.02", value: 20.2 },
];

const PlantDetails = () => {
  const navigate = useNavigate();
  const { data } = usePlantData();
  const { t } = useLanguage();

  const cropId = data.type || localStorage.getItem("selectedCrop") || "";
  const crop = getCropById(cropId);
  const cropName = crop ? t(crop.nameKey) : t("plant");
  const cropImage = crop?.image || plantFallback;

  const indicators = [
    { icon: Droplets, label: t("moisture"), value: data.moisture != null ? `${data.moisture}%` : "--", color: "text-info" },
    { icon: Thermometer, label: t("temperature"), value: data.temperature != null ? `${data.temperature}°C` : "--", color: "text-destructive" },
    { icon: Wind, label: t("humidity"), value: data.humidity != null ? `${data.humidity}%` : "--", color: "text-primary" },
    { icon: TrendingUp, label: t("height"), value: "18.6 cm", color: "text-accent-foreground" },
  ];

  return (
    <MobileLayout>
      <div className="pb-24">
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-card flex items-center justify-center border border-border">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold text-foreground flex-1">{cropName}</h1>
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <img src={cropImage} alt={cropName} width={20} height={20} className="object-contain" />
          </div>
        </div>

        <div className="flex justify-center py-4">
          <img src={cropImage} alt={cropName} width={160} height={200} className="object-contain" />
        </div>

        <div className="grid grid-cols-2 gap-3 px-5 mb-6">
          {indicators.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-card rounded-xl p-3.5 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} className={color} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="text-lg font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        <div className="px-5 mb-6">
          <h3 className="font-semibold text-foreground mb-3">{t("moisture_over_time")}</h3>
          <div className="bg-card rounded-xl p-4 border border-border">
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={moistureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(220 10% 50%)" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(220 10% 50%)" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(145 63% 42%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="px-5">
          <h3 className="font-semibold text-foreground mb-3">{t("height")}</h3>
          <div className="bg-card rounded-xl p-4 border border-border">
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={heightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(220 10% 50%)" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(220 10% 50%)" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(145 63% 42%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(145 63% 42%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default PlantDetails;
