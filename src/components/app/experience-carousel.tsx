"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, Building } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { useI18n } from "@/hooks/use-i18n"

export default function ExperienceCarousel() {
  const { t } = useI18n()
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Dados de experiência profissional do arquivo de tradução
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

  const nextSlide = () => {
    if (currentIndex < experiences.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = currentIndex * (carouselRef.current.offsetWidth * 0.9)
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }, [currentIndex])

  return (
    <div className="relative">
      <div ref={carouselRef} className="flex overflow-x-hidden scroll-smooth" style={{ scrollSnapType: "x mandatory" }}>
        {experiences.map((exp) => (
          <Card
            key={exp.id}
            className="min-w-[90%] flex-shrink-0 mr-[10%] scroll-snap-align-start border-blue-100"
            style={{ scrollSnapAlign: "start" }}
          >
            <CardHeader className="p-0">
              <div className="h-8 w-full bg-blue-800"></div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-blue-900">{t(`${exp.translationKey}.role`)}</h3>
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <Building className="mr-1 h-4 w-4 text-blue-800" />
                {t(`${exp.translationKey}.company`)}
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-600">
                <Calendar className="mr-1 h-4 w-4 text-blue-800" />
                {t(`${exp.translationKey}.period`)}
              </div>
              <p className="mt-3 text-sm text-gray-700">{t(`${exp.translationKey}.description`)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 flex justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="border-blue-800 text-blue-800 hover:bg-blue-50 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">{t("experience.previous")}</span>
        </Button>
        <div className="flex gap-1">
          {experiences.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer ${index === currentIndex ? "bg-blue-800" : "bg-blue-200"}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={currentIndex === experiences.length - 1}
          className="border-blue-800 text-blue-800 hover:bg-blue-50 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">{t("experience.next")}</span>
        </Button>
      </div>
    </div>
  )
}
