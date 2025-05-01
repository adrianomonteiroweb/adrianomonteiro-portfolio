import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { I18nProvider } from "@/components/app/i18n-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Adriano Monteiro - Desenvolvedor de Software",
  description: "Portfólio de Adriano Monteiro, Desenvolvedor de Software Júnior especializado em automação web (RPA)",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <I18nProvider initialLocale="pt">{children}</I18nProvider>
      </body>
    </html>
  )
}
