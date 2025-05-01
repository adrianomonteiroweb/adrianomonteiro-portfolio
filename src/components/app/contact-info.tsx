"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { useI18n } from "@/hooks/use-i18n"

export default function ContactInfo() {
  const { t } = useI18n()

  return (
    <div className="space-y-4">
      <Card className="border-blue-100">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base text-blue-900">{t("contact.info.title")}</CardTitle>
          <CardDescription>{t("contact.info.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-800" />
            <Link href="mailto:adrianomonteiroweb@gmail.com" className="text-sm hover:underline text-gray-700">
              {t("contact.info.email")}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-blue-800" />
            <Link href="tel:+5585989587554" className="text-sm hover:underline text-gray-700">
              {t("contact.info.phone")}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-800" />
            <span className="text-sm text-gray-700">{t("contact.info.address")}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-800" />
            <span className="text-sm text-gray-700">{t("contact.info.city")}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-100">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-base text-blue-900">{t("contact.social.title")}</CardTitle>
          <CardDescription>{t("contact.social.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-wrap gap-2">
            <Link href="https://linkedin.com/in/adrianomonteirodev" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-1 border-blue-800 text-blue-800 hover:bg-blue-50">
                <Linkedin className="h-4 w-4" />
                {t("contact.social.linkedin")}
              </Button>
            </Link>
            <Link href="https://github.com/adrianomonteirodev" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-1 border-blue-800 text-blue-800 hover:bg-blue-50">
                <Github className="h-4 w-4" />
                {t("contact.social.github")}
              </Button>
            </Link>
            <Link href="https://adrianomonteirodev.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-1 border-blue-800 text-blue-800 hover:bg-blue-50">
                <Globe className="h-4 w-4" />
                {t("contact.social.website")}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
