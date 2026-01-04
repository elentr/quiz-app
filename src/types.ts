export type QuestionType = "one_choice" | "multiple_choice" | "open_ended";

export interface QuizQuestion {
  id: string;
  questionText: string;
  type: QuestionType;
  answers?: string[];
  correctAnswer?: string | string[];
}

export interface QuizStep {
  id: string;
  order: number;
  questions: QuizQuestion[];
}

// Тип для відповідей: для open_ended — string, для multiple — string[], для one — string
export type AnswerValue = string | string[];

// Об'єкт відповідей: ключ — id питання, значення — відповідь
export type AnswersRecord = Record<string, AnswerValue>;
