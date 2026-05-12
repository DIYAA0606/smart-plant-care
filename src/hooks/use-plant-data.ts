import { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "@/lib/firebase";
import { Preferences } from "@capacitor/preferences";
import { Network } from "@capacitor/network";
import { SyncQueue } from "@/lib/sync-queue";

export interface PlantData {
  moisture: number | null;
  temperature: number | null;
  humidity: number | null;
  pump: string | null;
  type: string | null;
  threshold: number | null;
  location?: { latitude: number; longitude: number } | null;
  place?: string | null;
}

const defaultData: PlantData = {
  moisture: null,
  temperature: null,
  humidity: null,
  pump: null,
  type: null,
  threshold: null,
  location: null,
  place: null,
};

const CACHE_KEY = "plant_data_cache";

export function usePlantData() {
  const [data, setData] = useState<PlantData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCache = async () => {
      try {
        const { value } = await Preferences.get({ key: CACHE_KEY });
        if (value) {
          setData(JSON.parse(value));
          setLoading(false);
        }
      } catch (e) {
        console.error("Failed to load cached plant data", e);
      }
    };
    loadCache();

    const plantRef = ref(db, "/plant");
    const unsubscribe = onValue(
      plantRef,
      (snapshot) => {
        const val = snapshot.val();
        if (val) {
          const newData = {
            moisture: val.moisture ?? null,
            temperature: val.temperature ?? null,
            humidity: val.humidity ?? null,
            pump: val.pump ?? null,
            type: val.type ?? null,
            threshold: val.threshold ?? null,
            location: val.location ?? null,
            place: val.place ?? null,
          };
          setData(newData);
          Preferences.set({ key: CACHE_KEY, value: JSON.stringify(newData) });
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
      setData((prev) => ({ ...prev, pump: status }));

      const netStatus = await Network.getStatus();
      if (netStatus.connected) {
        await set(ref(db, "/plant/pump"), status);
      } else {
        await SyncQueue.enqueueAction("PUMP_TOGGLE", { status });
      }
    } catch (err) {
      console.error("Failed to update pump:", err);
      throw err;
    }
  };

  return { data, loading, error, setPump };
}
