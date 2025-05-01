"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

import { ChevronLeft, ChevronRight, Github, ExternalLink, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

// Dados de exemplo para os projetos
const projects = [
  {
    id: 1,
    title: "E-commerce App",
    description: "Aplicação completa de e-commerce com carrinho de compras, pagamentos e painel administrativo.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    image: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    demo: "https://vercel.com",
    download: "#",
  },
  {
    id: 2,
    title: "Dashboard Analytics",
    description: "Dashboard interativo para visualização de dados e métricas de negócio.",
    technologies: ["React", "Chart.js", "Material UI"],
    image: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    demo: "https://vercel.com",
    download: "#",
  },
  {
    id: 3,
    title: "App de Tarefas",
    description: "Aplicativo de gerenciamento de tarefas com recursos de categorização e lembretes.",
    technologies: ["React Native", "Expo", "Firebase"],
    image: "/placeholder.svg?height=400&width=600",
    github: "https://github.com",
    demo: "https://vercel.com",
    download: "#",
  },
]

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    if (currentIndex < projects.length - 1) {
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
        {projects.map((project) => (
          <Card
            key={project.id}
            className="min-w-[90%] flex-shrink-0 mr-[10%] scroll-snap-align-start"
            style={{ scrollSnapAlign: "start" }}
          >
            <CardHeader className="p-0">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={400}
                className="h-48 w-full object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="mt-2 text-sm">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="rounded-full bg-muted px-2 py-1 text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4 pt-0">
              <Link href={project.github} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-1">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </Link>
              <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-1">
                  <ExternalLink className="h-4 w-4" />
                  Demo
                </Button>
              </Link>
              <Link href={project.download}>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-4 flex justify-between">
        <Button variant="outline" size="icon" onClick={prevSlide} disabled={currentIndex === 0}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Anterior</span>
        </Button>
        <div className="flex gap-1">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        <Button variant="outline" size="icon" onClick={nextSlide} disabled={currentIndex === projects.length - 1}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Próximo</span>
        </Button>
      </div>
    </div>
  )
}
