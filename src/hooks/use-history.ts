import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { Preferences } from "@capacitor/preferences";

const HISTORY_CACHE_KEY = "history_data_cache";

export interface HistoryItem {
  moisture?: number;
  temperature?: number;
  humidity?: number;
  timestamp: number;
}

export function useHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const [rawHistory, setRawHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCache = async () => {
      try {
        const { value } = await Preferences.get({ key: HISTORY_CACHE_KEY });
        if (value) {
          const cachedData = JSON.parse(value);
          setRawHistory(cachedData.raw);
          setHistory(cachedData.parsed);
          setLoading(false);
        }
      } catch (e) {
        console.error("Failed to load cached history", e);
      }
    };
    loadCache();

    const historyRef = ref(db, "/history");

    const unsubscribe = onValue(historyRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setLoading(false);
        return;
      }

      const rawItems = Object.values(data) as HistoryItem[];
      rawItems.sort((a, b) => b.timestamp - a.timestamp); // newest first
      
      const parsed = rawItems
        .filter(item => item.moisture !== undefined)
        .slice(0, 10)
        .reverse() // oldest first for chart
        .map((item: any) => ({
          value: item.moisture,
          date: new Date(item.timestamp).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          }),
        }));

      setRawHistory(rawItems);
      setHistory(parsed);
      
      Preferences.set({ 
        key: HISTORY_CACHE_KEY, 
        value: JSON.stringify({ raw: rawItems, parsed }) 
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { history, rawHistory, loading };
}