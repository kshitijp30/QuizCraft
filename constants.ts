
import { QuizQuestion, QuestionType } from './types';

export const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    type: QuestionType.MultipleChoice,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    id: 2,
    type: QuestionType.TrueFalse,
    question: "The Great Wall of China is visible from space with the naked eye.",
    answer: "False",
  },
  {
    id: 3,
    type: QuestionType.MultipleChoice,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    id: 4,
    type: QuestionType.TrueFalse,
    question: "For any real number x, the expression √x^2 is always equal to x.",
    answer: "False",
  },
  {
    id: 5,
    type: QuestionType.TrueFalse,
    question: "The Triangle Inequality |x + y| ≤ |x| + |y| always holds true, while the Reverse Triangle Inequality |x - y| ≥ ||x| - |y|| only applies when x and y have opposite signs.",
    answer: "False",
  },
  {
    id: 6,
    type: QuestionType.TrueFalse,
    question: "According to the logarithm properties, log_b(1) = 0 and b^(log_b(x)) = x are always true, provided b is a valid base and x is in the domain of the logarithm.",
    answer: "True",
  },
   {
    id: 7,
    type: QuestionType.MultipleChoice,
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
    answer: "William Shakespeare",
  },
];
