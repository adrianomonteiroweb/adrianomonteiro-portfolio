"use client"

import { useEffect, useState } from "react"

import { useI18n } from "@/hooks/use-i18n"

import ProfileHeader from "@/components/app/profile-header"
import ExperienceCarousel from "@/components/app/experience-carousel"
import AiAssistant from "@/components/app/ai-assistant"
import ProjectCarousel from "@/components/app/project-carousel"
import AboutSection from "@/components/app/about-section"
import LanguageSwitcher from "@/components/app/language-switcher"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const { t, isLoading } = useI18n()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Durante SSR ou antes da hidratação, retorne um esqueleto da página
  if (!isMounted) {
    return (
      <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-900 to-blue-950 p-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-2 shadow-lg">
          <div className="animate-pulse">
            <div className="h-8 w-24 bg-gray-200 rounded mb-4 ml-auto"></div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4"></div>
              <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Durante o carregamento das traduções
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-900 to-blue-950">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-900 to-blue-950 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-2 shadow-lg">
        <div className="flex justify-end mb-2">
          <LanguageSwitcher />
        </div>

        <ProfileHeader />

        <Tabs defaultValue="about" className="mt-4">
          <TabsList className="grid w-full grid-cols-3 bg-blue-50">
            <TabsTrigger value="about" className="text-sm data-[state=active]:bg-blue-800 data-[state=active]:text-white">
              {t("tabs.about")}
            </TabsTrigger>
            <TabsTrigger value="experience" className="text-sm data-[state=active]:bg-blue-800 data-[state=active]:text-white">
              {t("tabs.experience")}
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-sm data-[state=active]:bg-blue-800 data-[state=active]:text-white">
              {t("tabs.projects")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-4 space-y-4">
            <AboutSection />
            <AiAssistant />
          </TabsContent>

          <TabsContent value="experience" className="mt-4">
            <h2 className="mb-3 text-xl font-bold text-blue-900">{t("experience.title")}</h2>
            <ExperienceCarousel />
          </TabsContent>

          <TabsContent value="projects" className="mt-4">
            <h2 className="mb-3 text-xl font-bold text-blue-900">{t("projects.title")}</h2>
            <ProjectCarousel />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
