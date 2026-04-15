import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, User, Bell, Smartphone, LogOut, ChevronRight, Shield, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { Language } from "@/lib/i18n";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
];

const SettingsScreen = () => {
  const navigate = useNavigate();
  const [notifEnabled, setNotifEnabled] = useState(true);
  const userName = localStorage.getItem("userName") || "User";
  const { lang, changeLang, t } = useLanguage();
  const [showLangPicker, setShowLangPicker] = useState(false);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("selectedCrop");
    navigate("/login", { replace: true });
  };

  return (
    <MobileLayout>
      <div className="pb-24">
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-card flex items-center justify-center border border-border">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold text-foreground">{t("settings")}</h1>
        </div>

        <div className="px-5 space-y-4">
          {/* User */}
          <div className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">user@example.com</p>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>

          {/* Language */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <button
              onClick={() => setShowLangPicker(!showLangPicker)}
              className="w-full p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                  <Globe size={16} className="text-primary" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-medium text-foreground block">{t("language")}</span>
                  <span className="text-xs text-muted-foreground">
                    {LANGUAGES.find((l) => l.code === lang)?.label}
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className={`text-muted-foreground transition-transform ${showLangPicker ? "rotate-90" : ""}`} />
            </button>
            {showLangPicker && (
              <div className="border-t border-border px-4 py-2 space-y-1">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { changeLang(l.code); setShowLangPicker(false); }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      lang === l.code
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-accent"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                  <Bell size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{t("notifications")}</span>
              </div>
              <Switch checked={notifEnabled} onCheckedChange={setNotifEnabled} />
            </div>
          </div>

          {/* Device */}
          <button
            onClick={() => navigate("/device-status")}
            className="w-full bg-card rounded-2xl p-4 border border-border flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                <Smartphone size={16} className="text-primary" />
              </div>
              <div className="text-left">
                <span className="text-sm font-medium text-foreground block">{t("device")}</span>
                <span className="text-xs text-muted-foreground">ESP32 Connected</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>

          {/* Privacy */}
          <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                <Shield size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{t("privacy")}</span>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full bg-destructive/10 rounded-2xl p-4 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center">
              <LogOut size={16} className="text-destructive" />
            </div>
            <span className="text-sm font-medium text-destructive">{t("logout")}</span>
          </button>
        </div>
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default SettingsScreen;
