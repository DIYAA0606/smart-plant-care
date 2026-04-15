import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { db, ref, onValue, set } from "./firebase";
import { Geolocation } from '@capacitor/geolocation';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import Dashboard from "./pages/Dashboard";
import PlantDetails from "./pages/PlantDetails";
import NotificationsScreen from "./pages/NotificationsScreen";
import ActionsScreen from "./pages/ActionsScreen";
import DeviceStatus from "./pages/DeviceStatus";
import HistoryScreen from "./pages/HistoryScreen";
import SettingsScreen from "./pages/SettingsScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const getLocation = async () => {
  try {
    const position = await Geolocation.getCurrentPosition();

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    console.log("LAT:", lat);
    console.log("LNG:", lng);

    // 🔥 store in Firebase
    set(ref(db, "plant/location"), {
      lat: lat,
      lng: lng
    });

  } catch (error) {
    console.log("Location error:", error);
  }
};

const App = () => {

  useEffect(() => {
    // 🔥 listen to Firebase
    const plantRef = ref(db, "plant");

    onValue(plantRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase Data:", data);
    });

    // 🔥 get location
    getLocation();

  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plant-details" element={<PlantDetails />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/actions" element={<ActionsScreen />} />
            <Route path="/device-status" element={<DeviceStatus />} />
            <Route path="/history" element={<HistoryScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
export default App;
