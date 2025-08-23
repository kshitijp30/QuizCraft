
import React from 'react';
import { QuizQuestion, QuestionType } from '../../types';
import QuestionCard from './QuestionCard';

interface QuestionsPageProps {
  questions: QuizQuestion[];
  setQuestions: (questions: QuizQuestion[]) => void;
}

const QuestionsPage: React.FC<QuestionsPageProps> = ({ questions, setQuestions }) => {

  const handleUpdateQuestion = (updatedQuestion: QuizQuestion) => {
    setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleAddQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now(),
      type: QuestionType.MultipleChoice,
      question: 'New question text...',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      answer: 'Option A',
    };
    setQuestions([...questions, newQuestion]);
  };
  
  const renderEmptyState = () => (
    <div className="text-center py-20 px-6 bg-white dark:bg-gray-900/50 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">No Questions Yet</h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        It looks like you haven't generated any questions.
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        Go to the 'Upload' tab to create a new quiz from a PDF.
      </p>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Review & Edit Questions</h2>
        <button
          onClick={handleAddQuestion}
          className="bg-brand-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-brand-700 transition duration-300"
        >
          + Add Question
        </button>
      </div>
      {questions.length > 0 ? (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <QuestionCard
              key={q.id}
              questionData={q}
              index={index}
              onUpdate={handleUpdateQuestion}
              onDelete={handleDeleteQuestion}
            />
          ))}
        </div>
      ) : (
        renderEmptyState()
      )}
    </div>
  );
};

export default QuestionsPage;
