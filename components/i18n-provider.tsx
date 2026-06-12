"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { type Lang, type Dict, getDict, dictionaries, HREFLANG } from "@/lib/i18n";

interface I18nValue {
  lang: Lang;
  t: Dict;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  useEffect(() => {
    // Keep the document language attribute correct per route (uk for Ukrainian).
    document.documentElement.lang = HREFLANG[lang];
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, t: getDict(lang) }}>
      {children}
    </I18nContext.Provider>
  );
}

/** Returns the active language + dictionary. Defaults to English when used
 *  outside a provider (e.g. on secondary pages), so shared components stay safe. */
export function useI18n(): I18nValue {
  return useContext(I18nContext) ?? { lang: "en", t: dictionaries.en };
}
