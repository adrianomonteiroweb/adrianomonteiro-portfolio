"use client"

import { createContext, useState, useEffect, useLayoutEffect, type ReactNode } from "react"

type I18nContextType = {
  locale: string
  setLocale: (locale: string) => void
  t: (key: string) => string
  isLoading: boolean
}

export const I18nContext = createContext<I18nContextType>({
  locale: "pt",
  setLocale: () => {},
  t: () => "",
  isLoading: true
})

type I18nProviderProps = {
  children: ReactNode
  initialLocale?: string
}

// Usar useLayoutEffect no cliente e useEffect no servidor
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function I18nProvider({ children, initialLocale = "pt" }: I18nProviderProps) {
  const [locale, setLocale] = useState(initialLocale)
  const [translations, setTranslations] = useState<Record<string, any>>({})
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Detectar renderização no cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  useIsomorphicLayoutEffect(() => {
    // Carregar as traduções para o idioma atual
    const loadTranslations = async () => {
      setIsLoading(true)
      try {
        const translations = await import(`@/locales/${locale}.json`)
        setTranslations(translations.default || {})
      } catch (error) {
        console.error(`Failed to load translations for ${locale}`, error)
        // Fallback para português se houver erro
        if (locale !== "pt") {
          try {
            const ptTranslations = await import("@/locales/pt.json")
            setTranslations(ptTranslations.default || {})
          } catch (fallbackError) {
            console.error("Failed to load fallback translations", fallbackError)
            setTranslations({})
          }
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (isClient) {
      loadTranslations()
    }
  }, [locale, isClient])

  // Função para obter uma tradução por chave
  const t = (key: string): string => {
    if (isLoading || !isClient) {
      return key // Retorna a chave enquanto as traduções estão carregando ou no servidor
    }

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

  // No servidor ou durante a hidratação inicial, retorne apenas o children
  if (!isClient) {
    return <>{children}</>
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, isLoading }}>
      {isLoading ? (
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-800"></div>
        </div>
      ) : (
        children
      )}
    </I18nContext.Provider>
  )
}
