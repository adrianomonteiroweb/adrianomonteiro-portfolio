import { NextResponse } from "next/server"
import responses from "../app/data/responses.json"

// Resumo do perfil de Adriano para o prompt do assistente
const profileSummary = `
Nome: Adriano Monteiro.
Cargo: Desenvolvedor de Software Full Stack Júnior.
Especialização: Automação Web (RPA) (2 anos e 3 meses).
Outras experiências: Suporte técnico ao cliente, desenvolvimento web, desktop e mobile.
Localização: Fortaleza, Ceará, Brasil.

Experiência Profissional:
- Solfy Tech: Desenvolvedor de software júnior e suporte técnico ao cliente (Jan 2024 - Presente)
- Solfy Tech: Trainee de engenharia de software e suporte técnico ao cliente (Jul 2023 - Jan 2024)
- Adriano Monteiro Dev: Mentor de Programação (Mar 2022 - Jun 2023)
- Youfy: Trainee de engenharia de software (Mar 2022 - Mai 2022)

Habilidades Técnicas:
- Linguagens: JavaScript (avançado, 3 anos), TypeScript (intermediário, 1 ano)
- Frontend: React.js (avançado, 2 anos), Next.js (intermediário, 1 ano), Tailwind CSS (intermediário, 1 ano)
- Backend: Node.js (avançado, 3 anos)
- Mobile: React Native (iniciante,6 meses de experiência)
- Desktop: Electron.js (3 meses de experiência)
- Bancos de dados: PostgreSQL (intermediário), MongoDB (intermediário)
- ORMs: Sequelize (intermediário), Prisma (intermediário), Drizzle (intermediário)
- DevOps: Docker (intermediário), Git (avançado)
- Testes: Testes unitários (intermediário), testes de integração (avançado), testes de e2e (avançado)

Soft Skills: Resolução de problemas, adaptabilidade, criatividade, trabalho em equipe, comunicação eficaz, empatia, networking, proatividade, responsabilidade, ética no trabalho, aprendizado contínuo, autoconhecimento e principalmente gestão emocional.

Formação:
- Trybe: Desenvolvimento Web (Mai 2021 - Mai 2022).

Idiomas:
- Português: Nativo.
- Inglês: Intermediário (B1) - Conversação básica.	
- Francês: Iniciante (A2) - Leitura e escrita.

Outros:
- Scrum, kanban.
- Shadcn/ui, bootstrap.
- Vercel, Heroku e AWS.
- Figma.
`

interface AIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface RequestBody {
  message: string;
  language: "pt" | "en" | "fr";
}

const fallbackResponses = {
  pt: `Desculpe, não consegui conectar ao serviço de IA no momento.
  
  Mas falando um pouco sobre o Adriano Monteiro: Desenvolvedor de Software full stack Júnior com mais de 3 anos de experiência em startups e empresa de tecnologia, especializado em automação web (RPA), suporte/atendimento técnico ao cliente, além de desenvolvimento com JavaScript, TypeScript e Node.js. Para mais informações específicas, por favor entre em contato diretamente.`,
  en: `Sorry, I couldn't connect to the AI service at the moment.
  
  But talking about Adriano Monteiro: Junior full stack developer with over 3 years of experience in startups and technology company, specialized in web automation (RPA), customer support, in addition to development with JavaScript, TypeScript and Node.js. For more specific information, please contact him directly.`,
  fr: `Désolé, je n'ai pas pu me connecter au service AI pour le moment.

  Mais parlons un peu d'Adriano Monteiro : Développeur logiciel junior full stack avec plus de 3 ans d'expérience dans des startups et des entreprises technologiques, spécialisé dans l'automatisation Web (RPA), le support client, ainsi que le développement avec JavaScript, TypeScript et Node.js. Pour des informations plus spécifiques, veuillez le contacter directement.
  `,
};

const buildPrompt = (message: string, responseLanguage: string) => `
Você é um assistente virtual para o portfólio de Adriano Monteiro, um desenvolvedor de software júnior full stack.

Analise todo o perfil profissional de Adriano: "${profileSummary}". De acordo com o perfil, responda perguntas de recrutadores e tech leads.

O usuário perguntou ou comentou: "${message}". Responda sempre no mesmo idioma da pergunta, de forma resumida e no máximo em 4 linhas em ${responseLanguage}. De acordo com a pergunta ou afirmação, tente responder me posicionando como candidato ideal mesmo para uma vaga para pleno (principalmente para automação web RPA) abordando rápido aprendizado e adaptação. Mas não me posicione para senior no momento.
`;

async function fetchAIResponse(prompt: string): Promise<string> {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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
          content: prompt,
        },
      ],
    }),
  });


  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data: AIResponse = await response.json();
  return data.choices[0].message.content;
}

export async function POST(request: Request) {
  try {
    // Validar e extrair o corpo da requisição
    const body: RequestBody = await request.json();
    const { message, language } = body;

    if (!message || !language) {
      return NextResponse.json(
        { error: "Message and language are required" },
        { status: 400 }
      );
    }

    // Determinar o idioma para o prompt
    const languageMap = {
      en: "English",
      fr: "French",
      pt: "português",
    };

    const responseLanguage = languageMap[language] || "português";
    const prompt = buildPrompt(message, responseLanguage);

    try {
      const aiResponse = await fetchAIResponse(prompt);
      return NextResponse.json({ response: aiResponse });
    } catch (error) {
      console.error("Error calling OpenRouter API:", error);
      
      // Retornar resposta de fallback no idioma apropriado
      return NextResponse.json({
        response: fallbackResponses[language] || fallbackResponses.pt,
        error: responses.server_error,
      });
    }
  } catch (error) {
    console.error("Error in AI assistant API:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
