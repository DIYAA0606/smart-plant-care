import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, ref, onValue, set } from "./firebase";
import { Geolocation } from "@capacitor/geolocation";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import Dashboard from "./pages/Dashboard";
import PlantDetails from "./pages/PlantDetails";
import NotificationsScreen from "./pages/NotificationsScreen";
import { push } from "firebase/database";
import ActionsScreen from "./pages/ActionsScreen";
import CropSelectScreen from "./pages/CropSelectScreen";
import DeviceStatus from "./pages/DeviceStatus";
import HistoryScreen from "./pages/HistoryScreen";
import SettingsScreen from "./pages/SettingsScreen";
import NotFound from "./pages/NotFound";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { Network } from "@capacitor/network";
import { SyncQueue } from "./lib/sync-queue";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { auth } from "@/lib/firebase";

const queryClient = new QueryClient();
const fetchWeather = async (lat, lng) => {
  try {
    const status = await Network.getStatus();
    if (!status.connected) {
      console.log("Skipping weather fetch: Offline");
      return;
    }
    const API_KEY = "4415e0577b67054c93de0183d3e7307b";

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    );

    const data = await res.json();

    const temp = data.main.temp;
    const humidity = data.main.humidity;

    console.log("Temp:", temp);
    console.log("Humidity:", humidity);

    // 🔥 STORE IN FIREBASE
    await set(ref(db, "plant/temperature"), temp);
    await set(ref(db, "plant/humidity"), humidity);
    console.log("PUSHING WEATHER TO HISTORY...");
    await push(ref(db, "history"), {
  temperature: temp,
  humidity: humidity,
  timestamp: Date.now(),
});

  } catch (err) {
    console.log("Weather error:", err);
  }
};
const getPlaceName = async (lat, lng) => {
  try {
    const status = await Network.getStatus();
    if (!status.connected) {
      console.log("Skipping place name fetch: Offline");
      return;
    }
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );

    const data = await res.json();

    const place =
      data.address.city ||
      data.address.town ||
      data.address.village ||
      "Unknown";

    console.log("Place:", place);

    await set(ref(db, "plant/place"), place);

  } catch (err) {
    console.log("Place error:", err);
  }
};
const getLocation = async () => {
  try {
    // ✅ ONLY run on real mobile device
    if (!(window as any).Capacitor?.isNativePlatform()) {
      console.log("Skipping location (web)");
      return;
    }
    
    const permission = await Geolocation.requestPermissions();

    if (permission.location !== "granted") {
      throw new Error("Location permission denied");
    }

    const position = await Geolocation.getCurrentPosition();

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    fetchWeather(lat, lng);
    getPlaceName(lat, lng); 

    console.log("LAT:", lat);
    console.log("LNG:", lng);

    await set(ref(db, "plant/location"), {
      lat,
      lng,
    });

  } catch (error) {
    console.log("Location error:", error);
  }
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("isLoggedIn") === "true"
  );
  useEffect(() => {
  const checkLogin = () => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  };

  window.addEventListener("storage", checkLogin);

  return () => window.removeEventListener("storage", checkLogin);
  }, []);
  
  

  useEffect(() => {
    const plantRef = ref(db, "plant");

    const unsubscribe = onValue(plantRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase Data:", data);
    });

    const initApp = async () => {
      const status = await Network.getStatus();
      if (status.connected) {
        set(ref(db, "plant/pump"), "OFF");
        SyncQueue.processQueue();
      }
      getLocation();
    };
    initApp();

    const listener = Network.addListener("networkStatusChange", (status) => {
      if (status.connected) {
        SyncQueue.processQueue();
      }
    });

    return () => {
      unsubscribe();
      listener.then((l) => l.remove());
    };
  }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <OfflineIndicator />
        <BrowserRouter>
          <Routes>

  <Route
    path="/"
    element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
  />

  <Route
    path="/login"
    element={!isLoggedIn ? <LoginScreen /> : <Navigate to="/dashboard" />}
  />

  <Route
    path="/dashboard"
    element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
  />

  <Route
    path="/select-crop"
    element={isLoggedIn ? <CropSelectScreen /> : <Navigate to="/login" />}
  />

  <Route
    path="/plant-details"
    element={isLoggedIn ? <PlantDetails /> : <Navigate to="/login" />}
  />

  <Route
    path="/notifications"
    element={isLoggedIn ? <NotificationsScreen /> : <Navigate to="/login" />}
  />

  <Route
    path="/actions"
    element={isLoggedIn ? <ActionsScreen /> : <Navigate to="/login" />}
  />

  <Route
    path="/device-status"
    element={isLoggedIn ? <DeviceStatus /> : <Navigate to="/login" />}
  />

  <Route
    path="/history"
    element={isLoggedIn ? <HistoryScreen /> : <Navigate to="/login" />}
  />

  <Route
    path="/settings"
    element={isLoggedIn ? <SettingsScreen /> : <Navigate to="/login" />}
  />

  <Route path="*" element={<NotFound />} />

</Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;