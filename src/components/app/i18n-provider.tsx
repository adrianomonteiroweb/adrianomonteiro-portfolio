"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"

type I18nContextType = {
  locale: string
  setLocale: (locale: string) => void
  t: (key: string) => string
}

export const I18nContext = createContext<I18nContextType>({
  locale: "pt",
  setLocale: () => {},
  t: () => "",
})

type I18nProviderProps = {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = useState("pt")
  const [translations, setTranslations] = useState<Record<string, any>>({})

  useEffect(() => {
    // Carregar as traduções para o idioma atual
    const loadTranslations = async () => {
      try {
        const translations = await import(`@/locales/${locale}.json`)
        setTranslations(translations.default)
      } catch (error) {
        console.error(`Failed to load translations for ${locale}`, error)
        // Fallback para português se houver erro
        if (locale !== "pt") {
          const ptTranslations = await import("@/locales/pt.json")
          setTranslations(ptTranslations.default)
        }
      }
    }

    loadTranslations()
  }, [locale])

  // Função para obter uma tradução por chave
  const t = (key: string): string => {
    // Divide a chave por pontos para acessar objetos aninhados
    const keys = key.split(".")
    let value = translations

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }

    if (typeof value === "string") {
      return value
    }

    console.warn(`Translation value is not a string: ${key}`)
    return key
  }

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
}
