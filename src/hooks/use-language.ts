import { useState, useCallback } from "react";
import { Language, getStoredLanguage, setStoredLanguage, t as translate } from "@/lib/i18n";

export function useLanguage() {
  const [lang, setLang] = useState<Language>(getStoredLanguage);

  const changeLang = useCallback((l: Language) => {
    setStoredLanguage(l);
    setLang(l);
  }, []);

  const t = useCallback((key: string) => translate(key, lang), [lang]);

  return { lang, changeLang, t };
}
