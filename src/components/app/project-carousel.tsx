"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Github, Globe, Download } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import { useI18n } from "@/hooks/use-i18n"

type ProjectCategory = "web" | "desktop" | "automation" | "mobile"

interface Project {
  id: number
  translationKey: string
  category: ProjectCategory
  images: string[]
  skills: string[]
  github?: string
  website?: string
  download?: string
}

export default function ProjectCarousel() {
  const { t } = useI18n()
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Exemplo de projetos - você pode adicionar os seus posteriormente
  const projects: Project[] = [
    {
      id: 1,
      translationKey: "projects.portfolio",
      category: "web",
      images: ["/portfolio1.png", "/portfolio2.png"],
      skills: ["React", "Next.js", "TypeScript", "Tailwind"],
      github: "https://github.com/seu-usuario/portfolio",
      website: "https://seusite.com"
    },
    {
      id: 2,
      translationKey: "projects.automation",
      category: "automation",
      images: ["/automation1.png"],
      skills: ["Python", "Selenium", "Pandas"],
      github: "https://github.com/seu-usuario/automation",
      download: "https://download.com/app"
    }
  ]

  const handleNextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length)
    setCurrentImageIndex(0) // Reset image index when changing projects
  }

  const handlePrevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setCurrentImageIndex(0) // Reset image index when changing projects
  }

  const handleNextImage = () => {
    const project = projects[currentProjectIndex]
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const handlePrevImage = () => {
    const project = projects[currentProjectIndex]
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  const getCategoryColor = (category: ProjectCategory) => {
    const colors = {
      web: "bg-blue-500",
      desktop: "bg-purple-500",
      automation: "bg-green-500",
      mobile: "bg-orange-500"
    }
    return colors[category]
  }

  const currentProject = projects[currentProjectIndex]

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-gray-500">{t("projects.empty")}</p>
      </div>
    )
  }

  return (
    <div className="relative px-4 py-6">
      {/* Project Card */}
      <div className="relative min-h-[400px]">
        <motion.div
          key={currentProjectIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-blue-100 shadow-lg">
            <CardHeader className="relative p-0">
              {/* Category Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge
                  className={cn(
                    "text-white",
                    getCategoryColor(currentProject.category)
                  )}
                >
                  {t(`projects.categories.${currentProject.category}`)}
                </Badge>
              </div>

              {/* Image Carousel */}
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full"
                >
                  <Image
                    className="object-cover"
                    src={currentProject.images[currentImageIndex] || "/placeholder.png"}
                    alt={t(`${currentProject.translationKey}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={currentImageIndex === 0}
                  />
                  
                  {/* Image Navigation */}
                  {currentProject.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      
                      {/* Image Dots */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {currentProject.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={cn(
                              "w-1.5 h-1.5 rounded-full transition-all",
                              index === currentImageIndex
                                ? "bg-white"
                                : "bg-white/50"
                            )}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Project Title and Description */}
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                {t(`${currentProject.translationKey}.title`)}
              </h3>
              <p className="text-sm text-gray-700 line-clamp-2 mb-4">
                {t(`${currentProject.translationKey}.description`)}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {currentProject.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="bg-blue-50 text-blue-800 border-blue-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {currentProject.github && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => window.open(currentProject.github, "_blank")}
                  >
                    <Github className="h-4 w-4" />
                    <span>Código</span>
                  </Button>
                )}
                {currentProject.website && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => window.open(currentProject.website, "_blank")}
                  >
                    <Globe className="h-4 w-4" />
                    <span>Visualizar</span>
                  </Button>
                )}
                {currentProject.download && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => window.open(currentProject.download, "_blank")}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Project Navigation */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handlePrevProject}
          className={cn(
            "border-blue-800 text-blue-800 hover:bg-blue-50",
            "transition-all duration-200",
            "flex items-center gap-2 px-4 py-2"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Anterior</span>
        </Button>

        <div className="flex items-center gap-3">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentProjectIndex(index)
                setCurrentImageIndex(0)
              }}
              className={cn(
                "transition-all duration-300 rounded-full",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                index === currentProjectIndex
                  ? "w-8 h-2 bg-blue-800"
                  : "w-2 h-2 bg-blue-200 hover:bg-blue-300"
              )}
              aria-label={`Ir para projeto ${index + 1}`}
              aria-current={index === currentProjectIndex ? "true" : "false"}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="lg"
          onClick={handleNextProject}
          className={cn(
            "border-blue-800 text-blue-800 hover:bg-blue-50",
            "transition-all duration-200",
            "flex items-center gap-2 px-4 py-2"
          )}
        >
          <span className="hidden sm:inline">Próximo</span>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Progress Text */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Projeto {currentProjectIndex + 1} de {projects.length}
      </div>
    </div>
  )
} 