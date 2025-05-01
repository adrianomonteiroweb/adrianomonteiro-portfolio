"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, Building } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { useI18n } from "@/hooks/use-i18n"

export default function ExperienceCarousel() {
  const { t } = useI18n()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Dados de experiência profissional
  const experiences = [
    {
      id: 1,
      translationKey: "experience.companies.solfy1",
    },
    {
      id: 2,
      translationKey: "experience.companies.solfy2",
    },
    {
      id: 3,
      translationKey: "experience.companies.mentor",
    },
    {
      id: 4,
      translationKey: "experience.companies.youfy",
    },
  ]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length)
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative px-4 py-6">
      {/* Card Container */}
      <div className="relative min-h-[400px]">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-blue-100 shadow-lg">
            <CardHeader className="relative p-0">
              <div className="h-2 w-full bg-blue-800 rounded-t-lg" />
            </CardHeader>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                {t(`${experiences[currentIndex].translationKey}.role`)}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-700">
                  <Building className="mr-2 h-5 w-5 text-blue-800 flex-shrink-0" />
                  <span className="font-medium">
                    {t(`${experiences[currentIndex].translationKey}.company`)}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Calendar className="mr-2 h-5 w-5 text-blue-800 flex-shrink-0" />
                  <span>{t(`${experiences[currentIndex].translationKey}.period`)}</span>
                </div>
                <div className="mt-4 prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {t(`${experiences[currentIndex].translationKey}.description`)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handlePrev}
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
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                "transition-all duration-300 rounded-full",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                index === currentIndex
                  ? "w-8 h-2 bg-blue-800"
                  : "w-2 h-2 bg-blue-200 hover:bg-blue-300"
              )}
              aria-label={`Ir para experiência ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="lg"
          onClick={handleNext}
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
        Experiência {currentIndex + 1} de {experiences.length}
      </div>
    </div>
  )
}
