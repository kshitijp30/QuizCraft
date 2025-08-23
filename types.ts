
export enum QuestionType {
  MultipleChoice = 'multiple-choice',
  TrueFalse = 'true-false',
}

export interface QuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  answer: string;
}
