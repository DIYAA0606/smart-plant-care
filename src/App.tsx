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
import ActionsScreen from "./pages/ActionsScreen";
import CropSelectScreen from "./pages/CropSelectScreen";
import DeviceStatus from "./pages/DeviceStatus";
import HistoryScreen from "./pages/HistoryScreen";
import SettingsScreen from "./pages/SettingsScreen";
import NotFound from "./pages/NotFound";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { auth } from "@/lib/firebase";

const queryClient = new QueryClient();

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

    set(ref(db, "plant/pump"), "OFF");
    getLocation();

    return () => unsubscribe();
  }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
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