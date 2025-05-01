"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { useI18n } from "@/hooks/use-i18n"

export default function SkillsSection() {
  const { t } = useI18n()

  const skills = {
    languages: ["JavaScript", "TypeScript"],
    frontend: ["React.js", "Next.js", "Tailwind CSS"],
    backend: ["Node.js"],
    mobile: ["React Native"],
    desktop: ["Electron.js"],
    database: ["PostgreSQL", "MongoDB"],
    tools: ["Docker", "Git", "Jest", "Puppeteer", "Cypress"],
    orms: ["Sequelize", "Prisma", "Drizzle"],
    languages_human: [
      { name: "Português", level: t("pt") === t("pt") ? "Nativo" : t("pt") === t("en") ? "Native" : "Natif" },
      {
        name: "English",
        level:
          t("pt") === t("pt") ? "Intermediário (B1)" : t("pt") === t("en") ? "Intermediate (B1)" : "Intermédiaire (B1)",
      },
      {
        name: "Français",
        level: t("pt") === t("pt") ? "Iniciante (A2)" : t("pt") === t("en") ? "Beginner (A2)" : "Débutant (A2)",
      },
    ],
  }

  return (
    <div className="space-y-4">
      <Card className="border-blue-100">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-base text-blue-900">{t("skills.categories.languages")}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0 pb-4">
          <div className="flex flex-wrap gap-1.5">
            {skills.languages.map((skill) => (
              <Badge key={skill} className="bg-blue-800 hover:bg-blue-700">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-100">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-base text-blue-900">{t("skills.categories.web")}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0 pb-4">
          <div className="flex flex-wrap gap-1.5">
            {skills.frontend.map((skill) => (
              <Badge key={skill} className="bg-blue-800 hover:bg-blue-700">
                {skill}
              </Badge>
            ))}
            {skills.backend.map((skill) => (
              <Badge key={skill} className="bg-blue-800 hover:bg-blue-700">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-100">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-base text-blue-900">{t("skills.categories.mobile")}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0 pb-4">
          <div className="flex flex-wrap gap-1.5">
            {skills.mobile.map((skill) => (
              <Badge key={skill} className="bg-blue-800 hover:bg-blue-700">
                {skill}
              </Badge>
            ))}
            {skills.desktop.map((skill) => (
              <Badge key={skill} className="bg-blue-800 hover:bg-blue-700">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-100">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-base text-blue-900">{t("skills.categories.database")}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0 pb-4">
          <div className="flex flex-wrap gap-1.5">
            {skills.database.map((skill) => (
              <Badge key={skill} className="bg-blue-800 hover:bg-blue-700">
                {skill}
              </Badge>
            ))}
            {skills.orms.map((skill) => (
              <Badge key={skill} className="bg-blue-800 hover:bg-blue-700">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-100">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-base text-blue-900">{t("skills.categories.tools")}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0 pb-4">
          <div className="flex flex-wrap gap-1.5">
            {skills.tools.map((skill) => (
              <Badge key={skill} className="bg-blue-800 hover:bg-blue-700">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-100">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-base text-blue-900">{t("skills.categories.human_languages")}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0 pb-4">
          <div className="space-y-2">
            {skills.languages_human.map((lang) => (
              <div key={lang.name} className="flex justify-between">
                <span className="text-sm font-medium">{lang.name}</span>
                <span className="text-sm text-gray-600">{lang.level}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
