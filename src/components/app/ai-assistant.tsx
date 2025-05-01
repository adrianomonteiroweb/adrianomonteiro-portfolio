"use client"

import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

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
  const viewportRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (viewportRef.current) {
      const viewport = viewportRef.current
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const trimmedInput = input.trim()

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: trimmedInput,
      isUser: true,
    }

    setMessages((prev) => [...prev, userMessage])

    // Add loading message
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
          message: trimmedInput,
          language: locale,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get assistant response")
      }

      const data = await response.json()

      // Remove loading message and add real response
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
      // Replace loading message with error message
      setMessages((prev) =>
        prev
          .filter((msg) => !msg.isLoading)
          .concat({
            id: messages.length + 2,
            content: t("ai.error"),
            isUser: false,
          }),
      )
      console.error("Error calling API:", error)
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
        <ScrollArea className="h-[280px]">
          <ScrollAreaPrimitive.Viewport ref={viewportRef} className="h-full w-full pr-4">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`group flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={cn(
                      "rounded-lg p-3 text-sm transition-all duration-200",
                      "max-w-[85%] break-words",
                      message.isUser
                        ? "bg-blue-800 text-white"
                        : "bg-blue-50 text-gray-800",
                      message.isLoading && "animate-pulse",
                      "opacity-100"
                    )}
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap"
                    }}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollAreaPrimitive.Viewport>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex w-full gap-2"
        >
          <Input
            placeholder={t("ai.placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="text-sm border-blue-200 focus-visible:ring-blue-500"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className={cn(
              "bg-blue-800 hover:bg-blue-700 transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">{t("ai.send")}</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
