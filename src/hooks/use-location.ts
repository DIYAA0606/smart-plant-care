import { useEffect, useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "@/lib/firebase";
import { Geolocation } from "@capacitor/geolocation";

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
  const getPlaceName = async (lat: number, lng: number) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );

    const data = await res.json();

    const place =
      data.address.city ||
      data.address.town ||
      data.address.village ||
      "Unknown";

    await set(ref(db, "/plant/place"), place);

  } catch (err) {
    console.log("Place error:", err);
  }
};

  useEffect(() => {
    const getLocation = async () => {
      if (!(window as any).Capacitor?.isNativePlatform()) {
  console.log("Skipping location (web)");
  return;
}
      try {
        // 🔥 STEP 1: REQUEST PERMISSION
        const permission = await Geolocation.requestPermissions();

        if (permission.location !== "granted") {
          throw new Error("Location permission denied");
        }

        // 🔥 STEP 2: GET LOCATION
        const position = await Geolocation.getCurrentPosition();

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getPlaceName(latitude, longitude);

        setState({ latitude, longitude, error: null, loading: false });

        // 🔥 STEP 3: SAVE TO FIREBASE
        await set(ref(db, "/plant/location"), { latitude, longitude });

      } catch (err: any) {
        console.error("Location error:", err);

        setState({
          latitude: null,
          longitude: null,
          error: err.message || "Location unavailable",
          loading: false,
        });
      }
    };

    getLocation();
    
  }, []);

  return state;
}