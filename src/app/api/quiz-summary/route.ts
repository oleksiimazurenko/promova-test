import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';


export type AnswerQuizSummaryType = {
  step: string;
  value: string | string[];
}

export type QuestionQuizSummaryType = {
  slug: string;
  question: string;
}

type RequestBody = {
  answers: AnswerQuizSummaryType[];
  questions: QuestionQuizSummaryType[];
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as RequestBody;
  const { answers, questions } = body;

  if (!answers || !questions) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  const summary = answers
    .map((a: AnswerQuizSummaryType) => {
      const q = questions.find((q: QuestionQuizSummaryType) => q.slug === a.step)?.question;
      const value = Array.isArray(a.value) ? a.value.join(', ') : a.value;
      return `Q: ${q}\nA: ${value}`;
    })
    .join('\n\n');

  const prompt = ChatPromptTemplate.fromTemplate(`
Ти є експерт з персоналізованих рекомендацій для вивчення мов.

На основі відповідей користувача зроби короткий висновок про його цілі, навчальний стиль та дай поради, як найкраще вивчати мову.

{userData}

Напиши коротке резюме українською.
  `);

  const model = new ChatOpenAI({
    temperature: 0.7,
    modelName: 'gpt-4',
    openAIApiKey: process.env.OPENAI_API_KEY,
  });


  const chain = prompt.pipe(model);

  const result = await chain.invoke({ userData: summary });

  return NextResponse.json({ result: result.content });
}