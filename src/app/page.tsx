"use client"

import { useEffect, useState } from "react"

import { useI18n } from "@/hooks/use-i18n"

import ProfileHeader from "@/components/app/profile-header"
import ExperienceCarousel from "@/components/app/experience-carousel"
import AiAssistant from "@/components/app/ai-assistant"
import SkillsSection from "@/components/app/skills-section"
import AboutSection from "@/components/app/about-section"
import LanguageSwitcher from "@/components/app/language-switcher"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const { t } = useI18n()
  const [mounted, setMounted] = useState(false)

  // Evita problemas de hidratação
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
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
            <TabsTrigger value="skills" className="text-sm data-[state=active]:bg-blue-800 data-[state=active]:text-white">
              {t("tabs.skills")}
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

          <TabsContent value="skills" className="mt-4">
            <h2 className="mb-3 text-xl font-bold text-blue-900">{t("skills.title")}</h2>
            <SkillsSection />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
