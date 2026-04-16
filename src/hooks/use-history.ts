import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";

export function useHistory() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const historyRef = ref(db, "/history");

    const unsubscribe = onValue(historyRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) return;

      const parsed = Object.values(data)
        .map((item: any) => ({
          moisture: item.moisture,
          timestamp: item.timestamp,
        }))
        .filter(item => item.moisture !== undefined)
        .sort((a: any, b: any) => a.timestamp - b.timestamp)
        .slice(-10) // last 10 points only
        .map((item: any) => ({
          value: item.moisture,
          date: new Date(item.timestamp).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          }),
        }));

      setHistory(parsed);
    });

    return () => unsubscribe();
  }, []);

  return history;
}