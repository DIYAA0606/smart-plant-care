import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Droplets, Leaf, Sun } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const months = ["JAN", "FEB", "MAR"];

const chartData: Record<string, { date: string; value: number }[]> = {
  JAN: [
    { date: "1", value: 55 }, { date: "7", value: 60 }, { date: "14", value: 52 },
    { date: "21", value: 68 }, { date: "28", value: 62 },
  ],
  FEB: [
    { date: "1", value: 60 }, { date: "7", value: 65 }, { date: "14", value: 58 },
    { date: "21", value: 72 }, { date: "28", value: 65 },
  ],
  MAR: [
    { date: "1", value: 62 }, { date: "7", value: 70 }, { date: "14", value: 64 },
    { date: "21", value: 75 }, { date: "28", value: 68 },
  ],
};

const logs = [
  { icon: Droplets, action: "Watered plant", date: "10.02", change: "+15% moisture" },
  { icon: Leaf, action: "Added fertilizer", date: "08.02", change: "NPK balanced" },
  { icon: Sun, action: "Light adjusted", date: "05.02", change: "+2h exposure" },
  { icon: Droplets, action: "Watered plant", date: "01.02", change: "+20% moisture" },
  { icon: Leaf, action: "Fertilizer added", date: "28.01", change: "Nitrogen boost" },
];

const HistoryScreen = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("FEB");

  return (
    <MobileLayout>
      <div className="pb-24">
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-card flex items-center justify-center border border-border">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold text-foreground">History</h1>
        </div>

        {/* Month Filter */}
        <div className="flex gap-2 px-5 mb-5">
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
        </div>

        {/* Chart */}
        <div className="px-5 mb-6">
          <h3 className="font-semibold text-foreground mb-3">Moisture Over Time</h3>
          <div className="bg-card rounded-xl p-4 border border-border">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={chartData[selectedMonth]}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(220 10% 50%)" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(220 10% 50%)" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(145 63% 42%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(145 63% 42%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Logs */}
        <div className="px-5">
          <h3 className="font-semibold text-foreground mb-3">Activity Log</h3>
          <div className="space-y-2">
            {logs.map((log, i) => {
              const Icon = log.icon;
              return (
                <div key={i} className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <Icon size={14} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.change}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{log.date}</span>
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
