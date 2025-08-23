
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import UploadPage from './UploadPage';
import QuestionsPage from './QuestionsPage';
import ExportPage from './ExportPage';
import { AuthState } from '../../App';
import { QuizQuestion } from '../../types';

type Page = 'upload' | 'questions' | 'export';

interface DashboardProps {
  setAuthState: (state: AuthState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setAuthState }) => {
  const [currentPage, setCurrentPage] = useState<Page>('upload');
  const [isQuizReady, setIsQuizReady] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const renderPage = () => {
    switch (currentPage) {
      case 'upload':
        return <UploadPage setCurrentPage={setCurrentPage} setIsQuizReady={setIsQuizReady} setQuestions={setQuestions} />;
      case 'questions':
        return <QuestionsPage questions={questions} setQuestions={setQuestions} />;
      case 'export':
        return <ExportPage questions={questions} />;
      default:
        return <UploadPage setCurrentPage={setCurrentPage} setIsQuizReady={setIsQuizReady} setQuestions={setQuestions} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-primary text-gray-900 dark:text-primary-foreground">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} isQuizReady={isQuizReady} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setAuthState={setAuthState} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-primary">
          <div className="container mx-auto px-6 py-8">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;