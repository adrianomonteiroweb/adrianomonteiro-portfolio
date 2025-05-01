"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useI18n } from "@/hooks/use-i18n"

export default function ProfileHeader() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <Image
          src="/images/adriano.png"
          alt="Foto de perfil"
          width={100}
          height={120}
          className="rounded-full border-4 border-white shadow-md"
        />
        <div className="absolute -bottom-2 right-0 flex gap-1">
          <Link href="https://github.com/adrianomonteiroweb" target="_blank" rel="noopener noreferrer">
            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-blue-100 hover:bg-blue-200">
              <Github className="h-4 w-4 text-blue-800" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link href="https://linkedin.com/in/adrianomonteirodev" target="_blank" rel="noopener noreferrer">
            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-blue-100 hover:bg-blue-200">
              <Linkedin className="h-4 w-4 text-blue-800" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link href="mailto:adrianomonteiroweb@gmail.com">
            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-blue-100 hover:bg-blue-200">
              <Mail className="h-4 w-4 text-blue-800" />
              <span className="sr-only">Email</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-xs text-gray-500">{t("profile.greeting")}</p>
        <h1 className="text-2xl font-bold text-blue-900">{t("profile.name")}</h1>
        <p className="text-sm text-gray-600">{t("profile.title")}</p>
        <p className="text-xs text-gray-500">{t("profile.location")}</p>
      </div>
    </div>
  )
}
