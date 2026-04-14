import { useEffect, useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "@/lib/firebase";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: "Geolocation not supported", loading: false }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setState({ latitude, longitude, error: null, loading: false });

        try {
          await set(ref(db, "/plant/location"), { latitude, longitude });
        } catch (err) {
          console.error("Failed to save location:", err);
        }
      },
      (err) => {
        let message = "Location unavailable";
        if (err.code === 1) message = "Location permission denied";
        else if (err.code === 2) message = "Location unavailable";
        else if (err.code === 3) message = "Location request timed out";
        setState({ latitude: null, longitude: null, error: message, loading: false });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  return state;
}
