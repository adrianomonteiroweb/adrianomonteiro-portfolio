"use client"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

import { useI18n } from "@/hooks/use-i18n"

type Message = {
  id: number
  content: string
  isUser: boolean
  isLoading?: boolean
}

export default function AiAssistant() {
  const { t, locale }: any = useI18n()
  const [messages, setMessages] = useState<Message[]>([{ id: 1, content: t("ai.welcome"), isUser: false }])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    // Adiciona a mensagem do usuário
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      isUser: true,
    }

    setMessages((prev) => [...prev, userMessage])

    // Adiciona mensagem de carregamento
    const loadingMessage: Message = {
      id: messages.length + 2,
      content: t("ai.thinking"),
      isUser: false,
      isLoading: true,
    }

    setMessages((prev) => [...prev, loadingMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          language: locale,
        }),
      })

      if (!response.ok) {
        throw new Error("Falha ao obter resposta do assistente")
      }

      const data = await response.json()

      // Remove a mensagem de carregamento e adiciona a resposta real
      setMessages((prev) =>
        prev
          .filter((msg) => !msg.isLoading)
          .concat({
            id: messages.length + 2,
            content: data.response,
            isUser: false,
          }),
      )
    } catch (error) {
      // Em caso de erro, substitui a mensagem de carregamento por uma mensagem de erro
      setMessages((prev) =>
        prev
          .filter((msg) => !msg.isLoading)
          .concat({
            id: messages.length + 2,
            content: t("ai.error"),
            isUser: false,
          }),
      )
      console.error("Erro ao chamar a API:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-blue-100 shadow-sm">
      <CardHeader className="p-3">
        <CardTitle className="text-base text-blue-900">{t("ai.title")}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <ScrollArea className="h-[180px] pr-4">
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-lg p-3 text-xs ${
                  message.isUser ? "ml-auto bg-blue-800 text-white" : "mr-auto bg-blue-50 text-gray-800"
                } ${message.isLoading ? "animate-pulse" : ""} max-w-[80%]`}
              >
                {message.content}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <div className="flex w-full gap-2">
          <Input
            placeholder={t("ai.placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
            disabled={isLoading}
            className="text-sm border-blue-200 focus-visible:ring-blue-500"
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-blue-800 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">{t("ai.send")}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
