import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImg from "@/assets/logo.png";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { getRedirectResult } from "firebase/auth";

const LoginScreen = () => {
  const isMobile = /Android|iPhone/i.test(navigator.userAgent);
  const { lang, changeLang } = useLanguage();
  const [showLangPicker, setShowLangPicker] = useState(false);

  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      if (isMobile) {
        // 🔥 Mobile → use redirect
        await signInWithRedirect(auth, provider);
      } else {
        // 🔥 Laptop → use popup
        const result = await signInWithPopup(auth, provider);
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google sign-in failed");
    }
  };
  useEffect(() => {
  const checkRedirect = async () => {
    try {
      const result = await getRedirectResult(auth);

      if (result?.user) {
        console.log("Redirect user:", result.user);
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Redirect error:", error);
    }
  };

  checkRedirect();
}, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User detected:", user);
        localStorage.setItem("userName", user.displayName || "User");
        navigate("/dashboard", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (isSignup && !name) {
      setError("Please enter your name");
      return;
    }

    localStorage.setItem("userName", name || "User");
    navigate("/select-crop", { replace: true });
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen px-6 py-12">
        <div className="flex flex-col items-center mt-8 mb-10 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-4">
            <img src={logoImg} alt="SmartGrow" width={40} height={40} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isSignup ? "Start your plant journey" : "Sign in to continue"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-fade-in">
          {isSignup && (
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Full Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="h-12 rounded-xl bg-card"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 rounded-xl bg-card"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 rounded-xl bg-card pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          {!isSignup && (
            <button type="button" className="text-primary text-sm font-medium self-end -mt-1">
              Forgot Password?
            </button>
          )}

          <div className="bg-card rounded-2xl border border-border overflow-hidden mb-4">
            <button
              type="button"
              onClick={() => setShowLangPicker(!showLangPicker)}
              className="w-full p-4 flex items-center justify-between"
            >
              <span className="text-sm font-medium text-foreground">
                Language: {lang === "en" ? "English" : lang === "hi" ? "हिन्दी" : "मराठी"}
              </span>
            </button>

            {showLangPicker && (
              <div className="border-t border-border px-3 py-2 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    changeLang("en");
                    setShowLangPicker(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium ${
                    lang === "en"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-accent text-foreground"
                  }`}
                >
                  English
                </button>

                <button
                  type="button"
                  onClick={() => {
                    changeLang("hi");
                    setShowLangPicker(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium ${
                    lang === "hi"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-accent text-foreground"
                  }`}
                >
                  हिन्दी
                </button>

                <button
                  type="button"
                  onClick={() => {
                    changeLang("mr");
                    setShowLangPicker(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium ${
                    lang === "mr"
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-accent text-foreground"
                  }`}
                >
                  मराठी
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-2 bg-white text-black py-3 rounded-xl font-medium"
          >
            Sign in with Google
          </button>

          <Button type="submit" className="h-12 rounded-xl text-base font-semibold mt-2">
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>

        <div className="flex items-center justify-center gap-1 mt-8">
          <span className="text-muted-foreground text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </span>
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
            className="text-primary text-sm font-semibold"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default LoginScreen;