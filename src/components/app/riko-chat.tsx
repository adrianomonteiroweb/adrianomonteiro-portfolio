"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import date_responses from "../../app/data/responses.json";
import { useColumnContext } from "@/contexts/columns";

export function RikoChat() {
  const [messages, setMessages] = useState<
    { id: string; role: string; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const { reload } = useColumnContext();

  const responses: any = date_responses.responses;

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen]);

  const fetchAIResponse = async (userMessage: string) => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemma-2-9b-it:free",
            messages: [
              {
                role: "system",
                content:
                  "1- Você é uma API de um sistema Kanban que retorna apenas JSON em objeto ou array de objetos, sem explicações ou comentários, para requisições HTTP em uma API REST. Garanta que o retorno deve ser um objeto único para apenas uma requisição: {...} ou um array de objetos para múltiplas requisições: [{...}, ...], interpretando comandos específicos ou criando as requisições adequadas. 2 - Cada objeto pode conter as seguintes chaves: title: O título da coluna ou tarefa. type: Se tratar-se de etapas, o valor será 'column'. Se tratar-se de tarefas, o valor sera 'card'. method: O método HTTP correspondente (POST, PUT, DELETE). message: Uma mensagem descritiva da ação, como: 'Criando coluna [title].' ou 'Criando tarefa [title].' ou 'Deletando coluna [title].' ou 'Deletando tarefa [title].' ou outras. Se for uma tarefa (card), incluir também: column: O nome da coluna onde a tarefa está. Se for uma edição (PUT), incluir também: old_title: O nome anterior antes da atualização. 3 - Considere sinônimos para colunas e tarefas, como 'step', 'task', entre outros, e corrija erros de digitação automaticamente. 4 - É requisito mínimo conter as propriedades: title, type e method",
              },
              {
                role: "user",
                content: `Retorne apenas o seguinte JSON, sem modificações: ${JSON.stringify(
                  userMessage
                )}`,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      const ai_response =
        data.choices?.[0]?.message?.content || "Erro ao obter resposta.";

      const clean_response = ai_response?.replace(/```json|```/g, "").trim();

      const parsed_response = JSON.parse(clean_response);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: parsed_response.message,
        },
      ]);

      await executeBackendRequest(parsed_response);
    } catch (error: any) {
      console.error("Erro ao chamar a API:", error.message);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: JSON.stringify(responses.server_error),
        },
      ]);
    }

    setLoading(false);
  };

  const executeBackendRequest = async (json: any) => {
    try {
      const method = json.method || json[0]?.method;
      const url = json.type || json[0]?.type;
      console.log(json);

      const backendResponse = await axios({
        method: method.toLowerCase(),
        url: `http://localhost:3000/api/${url}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: json,
      });

      const message = backendResponse.data.message;

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: message },
      ]);

      reload();
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Não consegui realizar o seu pedido. Por favor, tente novamente.`,
        },
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    await fetchAIResponse(input);
  };

  function removeMarkdown(codeBlock?: string) {
    if (!codeBlock) {
      return "";
    }

    return codeBlock.replace(/```[a-z]*\s*([\s\S]*?)```/, "$1").trim();
  }

  const clearConversation = () => {
    setMessages([]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-600 shadow-lg transition-all duration-300 ease-in-out"
          aria-label="Abrir chat"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-64 sm:w-72 md:w-80 h-[28rem] flex flex-col rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out">
          <div className="bg-gray-100 text-gray-800 py-2 px-3 flex justify-between items-center">
            <span className="font-medium text-sm">Riko 理子</span>
            <div className="flex items-center space-x-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-800 h-6 w-6 p-0"
                    aria-label="Limpar conversa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                {/* Corrigido o AlertDialogContent para garantir fundo opaco */}
                <AlertDialogContent className="bg-white border border-gray-200 shadow-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Limpar conversa?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso irá remover
                      permanentemente todo o histórico de mensagens.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={clearConversation}>
                      Continuar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-800 h-6 w-6 p-0"
                aria-label="Fechar chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <CardContent
            className="flex-grow p-3 bg-white overflow-hidden"
            ref={scrollAreaRef}
          >
            <ScrollArea className="h-full w-full pr-2" scrollHideDelay={300}>
              <div className="space-y-2">
                {messages.map((m) => {
                  const content =
                    m.role === "user" ? m.content : removeMarkdown(m.content);

                  return (
                    <div
                      key={m.id}
                      className={`mb-2 ${
                        m.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <span
                        className={`inline-block p-2 rounded-lg text-xs ${
                          m.role === "user"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {content}
                      </span>
                    </div>
                  );
                })}

                {loading && (
                  <div className="text-left text-xs text-gray-500 mt-2">
                    <span className="inline-block p-2 rounded-lg bg-gray-100">
                      Digitando...
                    </span>
                  </div>
                )}

                <div ref={messagesEndRef} className="h-0" />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="bg-gray-50 p-2">
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-grow text-xs rounded-full border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-100 focus:ring-opacity-50"
              />
              <Button
                type="submit"
                size="sm"
                className="rounded-full bg-blue-500 hover:bg-blue-600 text-white px-3 transition-colors duration-200"
                disabled={loading}
                aria-label="Enviar mensagem"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
