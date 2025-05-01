"use client"

import { useI18n } from "@/hooks/use-i18n"

import { Card } from "@/components/ui/card"

export default function AboutSection() {
  const { t, locale }: any = useI18n();

  // Vídeos diferentes para cada idioma
  const videos = {
    pt: "/placeholder.svg?height=400&width=600", // Placeholder para vídeo em português
    en: "/placeholder.svg?height=400&width=600", // Placeholder para vídeo em inglês
    fr: "/placeholder.svg?height=400&width=600", // Placeholder para vídeo em francês
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-blue-900">{t("about.title")}</h2>
        <p className="text-sm text-gray-700">{t("about.description1")}</p>
        <p className="text-sm text-gray-700">{t("about.description2")}</p>
      </div>

      <Card className="overflow-hidden border-blue-100">
        <div className="aspect-video w-full bg-gray-100 flex items-center justify-center">
          {/* Aqui você pode substituir por um vídeo real */}
          <video
            src={locale === "en" ? videos.en : locale === "fr" ? videos.fr : videos.pt}
            controls
            poster="/placeholder.svg?height=400&width=600"
            className="w-full h-full object-cover"
          >
            {t("about.videoNotSupported")}
          </video>
        </div>
      </Card>
    </div>
  )
}
