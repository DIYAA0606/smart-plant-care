export type Language = "en" | "hi" | "mr";

const translations: Record<string, Record<Language, string>> = {
  // General
  "app.name": { en: "SmartGrow", hi: "SmartGrow", mr: "SmartGrow" },
  "hello": { en: "Hello,", hi: "Hello,", mr: "Hello," },
  "settings": { en: "Settings", hi: "Settings", mr: "Settings" },
  "notifications": { en: "Notifications", hi: "Notifications", mr: "Notifications" },
  "history": { en: "History", hi: "History", mr: "History" },
  "actions": { en: "Actions", hi: "Actions", mr: "Actions" },
  "home": { en: "Home", hi: "Home", mr: "Home" },
  "plants": { en: "Plants", hi: "Plants", mr: "Plants" },
  "alerts": { en: "Alerts", hi: "Alerts", mr: "Alerts" },
  "logout": { en: "Logout", hi: "Logout", mr: "Logout" },
  "device": { en: "Device", hi: "Device", mr: "Device" },
  "privacy": { en: "Privacy & Security", hi: "Privacy & Security", mr: "Privacy & Security" },
  "language": { en: "Language", hi: "Language", mr: "Language" },
  "plant": { en: "Plant", hi: "Plant", mr: "Plant" },

  // Dashboard
  "moisture": { en: "Moisture", hi: "Moisture", mr: "Moisture" },
  "temperature": { en: "Temp", hi: "Temp", mr: "Temp" },
  "humidity": { en: "Humidity", hi: "Humidity", mr: "Humidity" },
  "location": { en: "Location", hi: "Location", mr: "Location" },
  "take_action": { en: "Take Action", hi: "Take Action", mr: "Take Action" },
  "recent_activity": { en: "Recent Activity", hi: "Recent Activity", mr: "Recent Activity" },
  "see_all": { en: "See all", hi: "See all", mr: "See all" },
  "healthy": { en: "Healthy", hi: "Healthy", mr: "Healthy" },
  "pump": { en: "Pump", hi: "Pump", mr: "Pump" },
  "getting_location": { en: "Getting location...", hi: "Getting location...", mr: "Getting location..." },
  "change_crop": { en: "Change Crop", hi: "Change Crop", mr: "Change Crop" },
  "watered_plant": { en: "Watered plant", hi: "Watered plant", mr: "Watered plant" },
  "added_fertilizer": { en: "Added fertilizer", hi: "Added fertilizer", mr: "Added fertilizer" },
  "adjusted_light": { en: "Adjusted light", hi: "Adjusted light", mr: "Adjusted light" },

  // Crop selection
  "select_crop": { en: "Select Your Crop", hi: "Select Your Crop", mr: "Select Your Crop" },
  "select_crop_desc": { en: "Choose the crop you're growing", hi: "Choose the crop you're growing", mr: "Choose the crop you're growing" },
  "continue": { en: "Continue", hi: "Continue", mr: "Continue" },

  // Irrigation
  "water_required": { en: "💧 Water Required", hi: "💧 Water Required", mr: "💧 Water Required" },
  "no_water_needed": { en: "✅ No Water Needed", hi: "✅ No Water Needed", mr: "✅ No Water Needed" },
  "moisture_low": { en: "Soil moisture is below threshold", hi: "Soil moisture is below threshold", mr: "Soil moisture is below threshold" },
  "moisture_ok": { en: "Soil moisture is sufficient", hi: "Soil moisture is sufficient", mr: "Soil moisture is sufficient" },

  // Actions
  "pump_control": { en: "Pump Control", hi: "Pump Control", mr: "Pump Control" },
  "pump_status": { en: "Pump Status", hi: "Pump Status", mr: "Pump Status" },
  "start_watering": { en: "Start Watering", hi: "Start Watering", mr: "Start Watering" },
  "stop_watering": { en: "Stop Watering", hi: "Stop Watering", mr: "Stop Watering" },
  "threshold": { en: "Threshold", hi: "Threshold", mr: "Threshold" },

  // Notifications
  "offline_warning": { en: "You are offline. Viewing cached data.", hi: "You are offline. Viewing cached data.", mr: "You are offline. Viewing cached data." },
  "no_notifications": { en: "No notifications right now", hi: "No notifications right now", mr: "No notifications right now" },
  "water_plant_alert": { en: "Water your plant", hi: "Water your plant", mr: "Water your plant" },
  "moisture_low_desc": { en: "Moisture level is below threshold", hi: "Moisture level is below threshold", mr: "Moisture level is below threshold" },
  "pump_off_alert": { en: "Pump is OFF", hi: "Pump is OFF", mr: "Pump is OFF" },
  "pump_off_low_moisture": { en: "Pump is off but moisture is low. Consider starting the pump.", hi: "Pump is off but moisture is low. Consider starting the pump.", mr: "Pump is off but moisture is low. Consider starting the pump." },
  "all_good": { en: "All good!", hi: "All good!", mr: "All good!" },
  "all_good_desc": { en: "Your plant is healthy and well-watered.", hi: "Your plant is healthy and well-watered.", mr: "Your plant is healthy and well-watered." },
  "pump_running": { en: "Pump is running", hi: "Pump is running", mr: "Pump is running" },
  "pump_running_desc": { en: "The pump is currently active and watering your crop.", hi: "The pump is currently active and watering your crop.", mr: "The pump is currently active and watering your crop." },
  "now": { en: "Now", hi: "Now", mr: "Now" },

  // Plant Details
  "height": { en: "Height", hi: "Height", mr: "Height" },
  "moisture_over_time": { en: "Moisture Over Time", hi: "Moisture Over Time", mr: "Moisture Over Time" },
  "activity_log": { en: "Activity Log", hi: "Activity Log", mr: "Activity Log" },

  // History
  "moisture_chart": { en: "Moisture Over Time", hi: "Moisture Over Time", mr: "Moisture Over Time" },

  // Device Status
  "device_status": { en: "Device Status", hi: "Device Status", mr: "Device Status" },
  "connected": { en: "Connected", hi: "Connected", mr: "Connected" },
  "battery": { en: "Battery", hi: "Battery", mr: "Battery" },
  "wifi_signal": { en: "WiFi Signal", hi: "WiFi Signal", mr: "WiFi Signal" },
  "sensor_status": { en: "Sensor Status", hi: "Sensor Status", mr: "Sensor Status" },
  "active": { en: "Active", hi: "Active", mr: "Active" },
  "last_updated": { en: "Last Updated", hi: "Last Updated", mr: "Last Updated" },

  // Crops
  "crop.wheat": { en: "Wheat", hi: "Wheat", mr: "Wheat" },
  "crop.rice": { en: "Rice", hi: "Rice", mr: "Rice" },
  "crop.barley": { en: "Barley", hi: "Barley", mr: "Barley" },
  "crop.sugarcane": { en: "Sugarcane", hi: "Sugarcane", mr: "Sugarcane" },
  "crop.cotton": { en: "Cotton", hi: "Cotton", mr: "Cotton" },
  "crop.maize": { en: "Maize", hi: "Maize", mr: "Maize" },
};

export function t(key: string, lang: Language): string {
  return translations[key]?.[lang] ?? translations[key]?.en ?? key;
}

export function getStoredLanguage(): Language {
  return (localStorage.getItem("appLanguage") as Language) || "en";
}

export function setStoredLanguage(lang: Language) {
  localStorage.setItem("appLanguage", lang);
}
