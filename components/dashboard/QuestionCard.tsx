
import React, { useState, useEffect } from 'react';
import { QuizQuestion, QuestionType } from '../../types';
import { Icon } from '../ui/Icon';

interface QuestionCardProps {
  questionData: QuizQuestion;
  index: number;
  onUpdate: (question: QuizQuestion) => void;
  onDelete: (id: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionData, index, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState<QuizQuestion>(questionData);

  useEffect(() => {
    setEditedQuestion(questionData);
  }, [questionData]);

  const handleSave = () => {
    onUpdate(editedQuestion);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedQuestion(questionData);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedQuestion({ ...editedQuestion, question: e.target.value });
  };
  
  const handleOptionChange = (optionIndex: number, value: string) => {
      const newOptions = [...(editedQuestion.options || [])];
      newOptions[optionIndex] = value;
      setEditedQuestion({...editedQuestion, options: newOptions});
  };

  const handleAnswerChange = (newAnswer: string) => {
      setEditedQuestion({...editedQuestion, answer: newAnswer});
  }

  const renderDisplayMode = () => (
    <div className="p-6">
      <div className="flex justify-between items-start">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          <span className="font-bold text-brand-600 dark:text-brand-400 mr-2">{index + 1}.</span>
          {questionData.question}
        </p>
        <div className="flex space-x-3 text-gray-400">
          <button onClick={() => setIsEditing(true)} className="hover:text-brand-500"><Icon name="edit"/></button>
          <button onClick={() => onDelete(questionData.id)} className="hover:text-red-500"><Icon name="delete"/></button>
        </div>
      </div>
      <div className="mt-4">
        {questionData.type === QuestionType.TrueFalse ? (
          <div className="flex space-x-4">
            {['True', 'False'].map(option => (
              <button key={option} className={`w-1/2 py-3 px-4 rounded-lg border text-center font-semibold transition-colors ${
                option === questionData.answer
                  ? 'bg-green-600/90 border-green-500 text-white'
                  : 'bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
              }`}>
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {questionData.options?.map((option, i) => (
               <div key={i} className={`p-3 rounded-lg border ${
                   option === questionData.answer 
                   ? 'bg-green-600/20 border-green-500 text-green-800 dark:text-green-300'
                   : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
               }`}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
  const renderEditMode = () => (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <span className="font-bold text-brand-600 dark:text-brand-400 mr-2">{index + 1}.</span>
        <textarea
            value={editedQuestion.question}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-brand-500 focus:border-brand-500"
            rows={3}
        />
      </div>
      <div className="mt-4">
        {editedQuestion.type === QuestionType.TrueFalse ? (
          <div className="flex space-x-4">
            {['True', 'False'].map(option => (
              <button key={option} onClick={() => handleAnswerChange(option)} className={`w-1/2 py-3 px-4 rounded-lg border text-center font-semibold transition-colors ${
                option === editedQuestion.answer
                  ? 'bg-green-600/90 border-green-500 text-white ring-2 ring-offset-2 ring-offset-gray-900 ring-green-500'
                  : 'bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}>
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {editedQuestion.options?.map((option, i) => (
              <div key={i} className="flex items-center">
                 <input
                    type="radio"
                    name={`q_${editedQuestion.id}_answer`}
                    checked={option === editedQuestion.answer}
                    onChange={() => handleAnswerChange(option)}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 dark:border-gray-600 mr-3"
                 />
                 <input 
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-brand-500 focus:border-brand-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>
       <div className="flex justify-end space-x-3 mt-6">
          <button onClick={handleCancel} className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-md text-white bg-brand-600 hover:bg-brand-700">Save</button>
       </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900/70 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
      {isEditing ? renderEditMode() : renderDisplayMode()}
    </div>
  );
};

export default QuestionCard;
