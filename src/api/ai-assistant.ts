import { NextResponse } from "next/server"

// Resumo do perfil de Adriano para o prompt do assistente
const profileSummary = `
Nome: Adriano Monteiro
Cargo: Desenvolvedor de Software Júnior
Especialização: Automação Web (RPA)
Experiência: Mais de 3 anos em startups
Localização: Fortaleza, Ceará, Brasil

Experiência Profissional:
- Solfy Tech: Desenvolvedor de software júnior (Jan 2024 - Presente)
- Solfy Tech: Trainee de engenharia de software (Jul 2023 - Jan 2024)
- Adriano Monteiro Dev: Mentor de Programação (Mar 2022 - Jun 2023)
- Youfy: Trainee de engenharia de software (Mar 2022 - Mai 2022)

Habilidades Técnicas:
- Linguagens: JavaScript, TypeScript
- Frontend: React.js, Next.js, Tailwind CSS
- Backend: Node.js
- Mobile: React Native
- Desktop: Electron.js
- Bancos de dados: PostgreSQL, MongoDB
- ORMs: Sequelize, Prisma, Drizzle
- DevOps: Docker, Git
- Testes: Jest, Puppeteer, Cypress

Formação:
- Trybe: Desenvolvimento Web (Mai 2021 - Mai 2022)

Idiomas:
- Português: Nativo
- Inglês: Intermediário (B1)
- Francês: Iniciante (A2)

Certificações:
- Fundamentos do Scrum
- Descubra o SQL
- Fundamentos de DevOps
- Fundamentos da Inteligência Artificial: Aprendizado de Máquina
- Desenvolvimento de Software Remoto: Como Aumentar sua Produtividade
`

export async function POST(request: Request) {
  try {
    const { message, language } = await request.json()

    // Determinar o idioma para o prompt
    let responseLanguage = "português"

    if (language === "en") {
      responseLanguage = "English"
    } else if (language === "fr") {
      responseLanguage = "French"
    }

    // Construir o prompt para o OpenRouter
    const prompt = `
    Você é um assistente virtual para o portfólio de Adriano Monteiro, um desenvolvedor de software.
    
    Aqui está um resumo do perfil de Adriano:
    ${profileSummary}
    
    A pergunta do usuário é: "${message}"
    
    Responda de forma concisa e profissional em ${responseLanguage}. Se a pergunta estiver relacionada à adequação de Adriano para uma vaga ou perfil específico, analise suas habilidades e experiência e explique por que ele seria ou não um bom candidato para a posição mencionada.
    
    Limite sua resposta a no máximo 3 parágrafos.
    `

    // Chamar a API do OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY || "sk-or-v1-..."}`, // Substitua pela sua chave real
        "HTTP-Referer": "https://adrianomonteirodev.com", // Substitua pelo seu domínio
        "X-Title": "Adriano Monteiro Portfolio",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // Você pode escolher outros modelos disponíveis no OpenRouter
        messages: [
          {
            role: "system",
            content: prompt,
          },
        ],
        max_tokens: 300,
      }),
    })

    if (!response.ok) {
      // Se não tiver a chave da API ou houver outro erro, retorne uma resposta simulada
      const fallbackResponses = {
        pt: "Desculpe, não consegui conectar ao serviço de IA no momento. Adriano Monteiro é um Desenvolvedor de Software Júnior com mais de 3 anos de experiência em startups, especializado em automação web (RPA) e desenvolvimento com JavaScript, TypeScript e Node.js. Para mais informações específicas, por favor entre em contato diretamente.",
        en: "Sorry, I couldn't connect to the AI service at the moment. Adriano Monteiro is a Junior Software Developer with over 3 years of experience in startups, specializing in web automation (RPA) and development with JavaScript, TypeScript, and Node.js. For more specific information, please contact him directly.",
        fr: "Désolé, je n'ai pas pu me connecter au service d'IA pour le moment. Adriano Monteiro est un Développeur de Logiciels Junior avec plus de 3 ans d'expérience dans des startups, spécialisé dans l'automatisation web (RPA) et le développement avec JavaScript, TypeScript et Node.js. Pour des informations plus spécifiques, veuillez le contacter directement.",
      }

      return NextResponse.json({
        response: fallbackResponses[language as keyof typeof fallbackResponses] || fallbackResponses.pt,
      })
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("Error in AI assistant API:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
