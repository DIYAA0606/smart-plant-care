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
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

const queryClient = new QueryClient();

const getLocation = async () => {
  try {
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
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth user:", currentUser);
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
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

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />

            <Route
              path="/login"
              element={!user ? <LoginScreen /> : <Navigate to="/dashboard" replace />}
            />

            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/select-crop"
              element={user ? <CropSelectScreen /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/plant-details"
              element={user ? <PlantDetails /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/notifications"
              element={user ? <NotificationsScreen /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/actions"
              element={user ? <ActionsScreen /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/device-status"
              element={user ? <DeviceStatus /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/history"
              element={user ? <HistoryScreen /> : <Navigate to="/login" replace />}
            />

            <Route
              path="/settings"
              element={user ? <SettingsScreen /> : <Navigate to="/login" replace />}
            />

            <Route path="/splash" element={<SplashScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;