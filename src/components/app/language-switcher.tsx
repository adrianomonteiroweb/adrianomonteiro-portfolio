"use client"

import { Globe } from "lucide-react"

import { useI18n } from "@/hooks/use-i18n"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  const languages = [
    { code: "pt", name: "Português" },
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 border-blue-800 text-blue-800 hover:bg-blue-50">
          <Globe className="h-4 w-4" />
          {languages.find((lang) => lang.code === locale)?.name || "Português"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLocale(language.code)}
            className={locale === language.code ? "bg-blue-50 font-medium" : ""}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
