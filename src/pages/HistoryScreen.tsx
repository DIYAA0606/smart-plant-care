
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Droplets, Leaf, Sun } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/hooks/use-language";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";


// const months = ["JAN", "FEB", "MAR"];

// const chartData: Record<string, { date: string; value: number }[]> = {
//   JAN: [
//     { date: "1", value: 55 }, { date: "7", value: 60 }, { date: "14", value: 52 },
//     { date: "21", value: 68 }, { date: "28", value: 62 },
//   ],
//   FEB: [
//     { date: "1", value: 60 }, { date: "7", value: 65 }, { date: "14", value: 58 },
//     { date: "21", value: 72 }, { date: "28", value: 65 },
//   ],
//   MAR: [
//     { date: "1", value: 62 }, { date: "7", value: 70 }, { date: "14", value: 64 },
//     { date: "21", value: 75 }, { date: "28", value: 68 },
//   ],
// };

const HistoryScreen = () => {
   type HistoryItem = {
   moisture: number;
  timestamp: number;
};

const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const historyRef = ref(db, "history");

    onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const arr = Object.values(data)as HistoryItem[];
      setHistory(arr.reverse());
    });
  }, []);
  const navigate = useNavigate();
  
  const { t } = useLanguage();

  // const logs = [
  //   { icon: Droplets, action: t("watered_plant"), date: "10.02", change: "+15%" },
  //   { icon: Leaf, action: t("added_fertilizer"), date: "08.02", change: "NPK" },
  //   { icon: Sun, action: t("adjusted_light"), date: "05.02", change: "+2h" },
  //   { icon: Droplets, action: t("watered_plant"), date: "01.02", change: "+20%" },
  // ];
  const chartData = history
    .filter(item => item.moisture!== undefined)
    
  .map(item => ({
    date: item.timestamp
      ? new Date(item.timestamp).toLocaleString()
      : "",
    value: item.moisture
  }));
  return (
    <MobileLayout>
      <div className="pb-24">
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-card flex items-center justify-center border border-border">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold text-foreground">{t("history")}</h1>
        </div>

        {/* <div className="flex gap-2 px-5 mb-5">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedMonth === m
                  ? "bg-foreground text-background"
                  : "bg-card border border-border text-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div> */}

        <div className="px-5 mb-6">
          <h3 className="font-semibold text-foreground mb-3">{t("moisture_chart")}</h3>
          <div className="bg-card rounded-xl p-4 border border-border">
           <ResponsiveContainer width="100%" height={200}>
  <LineChart data={chartData.length ? chartData : [{ date: "0", value: 0 }]}>
    <CartesianGrid strokeDasharray="3 3" />
    
    <XAxis 
      dataKey="date" 
      label={{ value: "Time", position: "insideBottom", offset: -5 }}
    />
    
    <YAxis 
      domain={[0, 100]} 
      label={{ value: "Moisture (%)", angle: -90, position: "insideLeft" }}
    />

    <Tooltip />

    <Line 
      type="monotone" 
      dataKey="value" 
      stroke="#22c55e" 
      strokeWidth={2} 
    />
  </LineChart>
</ResponsiveContainer>
            <div className="mt-6 space-y-2">
  {chartData.map((item, index) => (
    <div key={index} className="bg-card p-3 rounded-lg border">
      <p className="text-sm">
        Moisture: {item.value}%
      </p>
      <p className="text-xs text-muted-foreground">
        {item.date}
      </p>
    </div>
  ))}
</div>
          </div>
        </div>

        <div className="px-5">
          <h3 className="font-semibold text-foreground mb-3">{t("activity_log")}</h3>
          <div className="space-y-2">
            {history.length === 0 && (
  <p className="text-xs text-muted-foreground">No data yet</p>
)}
            {history.map((log, i) => {
              const Icon = Droplets;
              return (
                <div key={i} className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <Icon size={14} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
  {log.moisture && `Moisture: ${log.moisture}%`}
  {/* {log.temperature && ` Temp: ${log.temperature}°C`} */}
</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
  {log.timestamp
    ? new Date(log.timestamp).toLocaleString()
    : "No time"}
</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <BottomNav />
    </MobileLayout>
  );
};

export default HistoryScreen;
