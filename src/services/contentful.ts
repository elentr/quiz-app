import { createClient } from "contentful";
import type { QuizStep } from "../types";

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID!,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN!,
});

export async function getQuizSteps(): Promise<QuizStep[]> {
  const response = await client.getEntries({
    content_type: "step",
    include: 10,
    order: ["fields.order"],
  });


  const items = response.items as unknown as {
    fields: {
      id: string;
      order: number;
      questions: {
        fields: {
          id: string;
          questionText: string;
          type: "one_choice" | "multiple_choice" | "open_ended";
          answers?: string[];
          correctAnswer?: string | string[];
        };
      }[];
    };
  }[];

  return items
    .sort((a, b) => a.fields.order - b.fields.order) 
    .map((item) => ({
      id: item.fields.id,
      order: item.fields.order,
      questions: item.fields.questions.map((q) => ({
        id: q.fields.id,
        questionText: q.fields.questionText,
        type: q.fields.type,
        answers: q.fields.answers,
        correctAnswer: q.fields.correctAnswer,
      })),
    }));
}
