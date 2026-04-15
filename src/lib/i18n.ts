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
