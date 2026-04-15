import { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "@/lib/firebase";

export interface PlantData {
  moisture: number | null;
  temperature: number | null;
  humidity: number | null;
  pump: string | null;
  type: string | null;
  threshold: number | null;
  location?: { latitude: number; longitude: number } | null;
}

const defaultData: PlantData = {
  moisture: null,
  temperature: null,
  humidity: null,
  pump: null,
  type: null,
  threshold: null,
  location: null,
};

export function usePlantData() {
  const [data, setData] = useState<PlantData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const plantRef = ref(db, "/plant");
    const unsubscribe = onValue(
      plantRef,
      (snapshot) => {
        const val = snapshot.val();
        if (val) {
          setData({
            moisture: val.moisture ?? null,
            temperature: val.temperature ?? null,
            humidity: val.humidity ?? null,
            pump: val.pump ?? null,
            type: val.type ?? null,
            threshold: val.threshold ?? null,
            location: val.location ?? null,
          });
        }
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Firebase read error:", err);
        setError("Failed to connect to database");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const setPump = async (status: "ON" | "OFF") => {
    try {
      await set(ref(db, "/plant/pump"), status);
    } catch (err) {
      console.error("Failed to update pump:", err);
      throw err;
    }
  };

  return { data, loading, error, setPump };
}
