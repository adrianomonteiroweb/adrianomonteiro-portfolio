"use client"

import { useI18n } from "@/hooks/use-i18n"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="relative w-full pt-[56.25%]">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export default function AboutSection() {
  const { t, locale }: any = useI18n()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // IDs dos vídeos do YouTube para cada idioma
  const videos = {
    pt: {
      id: "DGG6H8iGNbA",
      title: "Apresentação em Português"
    },
    en: {
      id: "LrjlW00kkws",
      title: "English Presentation"
    },
    fr: {
      id: "TCgKyI8ItTo",
      title: "Présentation en Français"
    }
  }

  // Seleciona o vídeo baseado no idioma atual
  const currentVideo = videos[locale as keyof typeof videos] || videos.pt

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-blue-900">{t("about.title")}</h2>
        <p className="text-sm text-gray-700">{t("about.description1")}</p>
        <p className="text-sm text-gray-700">{t("about.description2")}</p>
      </div>

      <Card className="overflow-hidden border-blue-100">
        {!isClient ? (
          // Placeholder durante SSR
          <div className="aspect-video w-full bg-gray-100 animate-pulse" />
        ) : (
          <YouTubeEmbed
            videoId={currentVideo.id}
            title={currentVideo.title}
          />
        )}
      </Card>
    </div>
  )
}
