export type Language = "en" | "hi" | "mr";

const translations: Record<string, Record<Language, string>> = {
  // General
  "app.name": { en: "SmartGrow", hi: "SmartGrow", mr: "SmartGrow" },
  "hello": { en: "Hello,", hi: "नमस्ते,", mr: "नमस्कार," },
  "settings": { en: "Settings", hi: "सेटिंग्स", mr: "सेटिंग्ज" },
  "notifications": { en: "Notifications", hi: "सूचनाएं", mr: "सूचना" },
  "history": { en: "History", hi: "इतिहास", mr: "इतिहास" },
  "actions": { en: "Actions", hi: "कार्य", mr: "कृती" },
  "home": { en: "Home", hi: "होम", mr: "होम" },
  "plants": { en: "Plants", hi: "पौधे", mr: "वनस्पती" },
  "alerts": { en: "Alerts", hi: "अलर्ट", mr: "सूचना" },
  "logout": { en: "Logout", hi: "लॉगआउट", mr: "लॉगआउट" },
  "device": { en: "Device", hi: "उपकरण", mr: "उपकरण" },
  "privacy": { en: "Privacy & Security", hi: "गोपनीयता और सुरक्षा", mr: "गोपनीयता आणि सुरक्षा" },
  "language": { en: "Language", hi: "भाषा", mr: "भाषा" },
  "plant": { en: "Plant", hi: "पौधा", mr: "वनस्पती" },

  // Dashboard
  "moisture": { en: "Moisture", hi: "नमी", mr: "ओलावा" },
  "temperature": { en: "Temp", hi: "तापमान", mr: "तापमान" },
  "humidity": { en: "Humidity", hi: "आर्द्रता", mr: "आर्द्रता" },
  "location": { en: "Location", hi: "स्थान", mr: "स्थान" },
  "take_action": { en: "Take Action", hi: "कार्रवाई करें", mr: "कृती करा" },
  "recent_activity": { en: "Recent Activity", hi: "हालिया गतिविधि", mr: "अलीकडील क्रियाकलाप" },
  "see_all": { en: "See all", hi: "सभी देखें", mr: "सर्व पहा" },
  "healthy": { en: "Healthy", hi: "स्वस्थ", mr: "निरोगी" },
  "pump": { en: "Pump", hi: "पंप", mr: "पंप" },
  "getting_location": { en: "Getting location...", hi: "स्थान प्राप्त कर रहे हैं...", mr: "स्थान मिळवत आहे..." },
  "change_crop": { en: "Change Crop", hi: "फसल बदलें", mr: "पीक बदला" },
  "watered_plant": { en: "Watered plant", hi: "पौधे को पानी दिया", mr: "वनस्पतीला पाणी दिले" },
  "added_fertilizer": { en: "Added fertilizer", hi: "खाद डाली", mr: "खत घातले" },
  "adjusted_light": { en: "Adjusted light", hi: "रोशनी समायोजित की", mr: "प्रकाश समायोजित केला" },

  // Crop selection
  "select_crop": { en: "Select Your Crop", hi: "अपनी फसल चुनें", mr: "तुमचे पीक निवडा" },
  "select_crop_desc": { en: "Choose the crop you're growing", hi: "आप कौन सी फसल उगा रहे हैं चुनें", mr: "तुम्ही कोणते पीक घेत आहात ते निवडा" },
  "continue": { en: "Continue", hi: "जारी रखें", mr: "पुढे चला" },

  // Irrigation
  "water_required": { en: "💧 Water Required", hi: "💧 पानी आवश्यक", mr: "💧 पाणी आवश्यक" },
  "no_water_needed": { en: "✅ No Water Needed", hi: "✅ पानी की जरूरत नहीं", mr: "✅ पाण्याची गरज नाही" },
  "moisture_low": { en: "Soil moisture is below threshold", hi: "मिट्टी की नमी सीमा से नीचे है", mr: "मातीचा ओलावा मर्यादेखाली आहे" },
  "moisture_ok": { en: "Soil moisture is sufficient", hi: "मिट्टी की नमी पर्याप्त है", mr: "मातीचा ओलावा पुरेसा आहे" },

  // Actions
  "pump_control": { en: "Pump Control", hi: "पंप नियंत्रण", mr: "पंप नियंत्रण" },
  "pump_status": { en: "Pump Status", hi: "पंप स्थिति", mr: "पंप स्थिती" },
  "start_watering": { en: "Start Watering", hi: "पानी देना शुरू करें", mr: "पाणी देणे सुरू करा" },
  "stop_watering": { en: "Stop Watering", hi: "पानी देना बंद करें", mr: "पाणी देणे बंद करा" },
  "threshold": { en: "Threshold", hi: "सीमा", mr: "मर्यादा" },

  // Notifications
  "no_notifications": { en: "No notifications right now", hi: "अभी कोई सूचना नहीं", mr: "सध्या कोणतीही सूचना नाही" },
  "water_plant_alert": { en: "Water your plant", hi: "पौधे को पानी दें", mr: "वनस्पतीला पाणी द्या" },
  "moisture_low_desc": { en: "Moisture level is below threshold", hi: "नमी का स्तर सीमा से नीचे है", mr: "ओलावा पातळी मर्यादेखाली आहे" },
  "pump_off_alert": { en: "Pump is OFF", hi: "पंप बंद है", mr: "पंप बंद आहे" },
  "pump_off_low_moisture": { en: "Pump is off but moisture is low. Consider starting the pump.", hi: "पंप बंद है लेकिन नमी कम है। पंप चालू करने पर विचार करें।", mr: "पंप बंद आहे पण ओलावा कमी आहे. पंप सुरू करण्याचा विचार करा." },
  "all_good": { en: "All good!", hi: "सब ठीक है!", mr: "सर्व ठीक आहे!" },
  "all_good_desc": { en: "Your plant is healthy and well-watered.", hi: "आपका पौधा स्वस्थ है और अच्छी तरह से सींचा गया है।", mr: "तुमची वनस्पती निरोगी आणि चांगल्या प्रकारे पाणी दिलेली आहे." },
  "pump_running": { en: "Pump is running", hi: "पंप चालू है", mr: "पंप चालू आहे" },
  "pump_running_desc": { en: "The pump is currently active and watering your crop.", hi: "पंप वर्तमान में सक्रिय है और आपकी फसल को पानी दे रहा है।", mr: "पंप सध्या सक्रिय आहे आणि तुमच्या पिकाला पाणी देत आहे." },
  "now": { en: "Now", hi: "अभी", mr: "आत्ता" },

  // Plant Details
  "height": { en: "Height", hi: "ऊंचाई", mr: "उंची" },
  "moisture_over_time": { en: "Moisture Over Time", hi: "समय के साथ नमी", mr: "कालांतराने ओलावा" },
  "activity_log": { en: "Activity Log", hi: "गतिविधि लॉग", mr: "क्रियाकलाप लॉग" },

  // History
  "moisture_chart": { en: "Moisture Over Time", hi: "समय के साथ नमी", mr: "कालांतराने ओलावा" },

  // Device Status
  "device_status": { en: "Device Status", hi: "उपकरण स्थिति", mr: "उपकरण स्थिती" },
  "connected": { en: "Connected", hi: "कनेक्टेड", mr: "जोडलेले" },
  "battery": { en: "Battery", hi: "बैटरी", mr: "बॅटरी" },
  "wifi_signal": { en: "WiFi Signal", hi: "WiFi सिग्नल", mr: "WiFi सिग्नल" },
  "sensor_status": { en: "Sensor Status", hi: "सेंसर स्थिति", mr: "सेंसर स्थिती" },
  "active": { en: "Active", hi: "सक्रिय", mr: "सक्रिय" },
  "last_updated": { en: "Last Updated", hi: "अंतिम अपडेट", mr: "शेवटचे अपडेट" },

  // Crops
  "crop.wheat": { en: "Wheat", hi: "गेहूं", mr: "गहू" },
  "crop.rice": { en: "Rice", hi: "चावल", mr: "तांदूळ" },
  "crop.barley": { en: "Barley", hi: "जौ", mr: "जव" },
  "crop.sugarcane": { en: "Sugarcane", hi: "गन्ना", mr: "ऊस" },
  "crop.cotton": { en: "Cotton", hi: "कपास", mr: "कापूस" },
  "crop.maize": { en: "Maize", hi: "मक्का", mr: "मका" },
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
