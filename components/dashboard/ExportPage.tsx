
import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { QuizQuestion, QuestionType } from '../../types';

interface ExportPageProps {
  questions: QuizQuestion[];
}

// Helper to trigger file download from a string content
const downloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const handleExportPDF = (questions: QuizQuestion[]) => {
    const doc = new jsPDF();
    doc.text("QuizCraft Generated Quiz", 14, 20);
    
    const tableData = questions.map((q, index) => {
        let questionText = q.question;
        if (q.type === QuestionType.MultipleChoice && q.options) {
            const optionsString = q.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n');
            questionText += `\n\n${optionsString}`;
        }
        return [
            index + 1,
            questionText,
            q.answer,
        ];
    });

    autoTable(doc, {
        head: [['No.', 'Question', 'Correct Answer']],
        body: tableData,
        startY: 30,
        styles: {
            valign: 'middle',
        },
        headStyles: {
            fillColor: [77, 76, 233] // brand-700 color
        },
        columnStyles: {
            0: { cellWidth: 10 },
            1: { cellWidth: 'auto' },
            2: { cellWidth: 40 },
        },
    });

    doc.save('quiz.pdf');
};

const handleExportDOCX = (questions: QuizQuestion[]) => {
    let content = 'QuizCraft Generated Quiz\n\n';
    content += '----------------------------------------\n\n';
    questions.forEach((q, index) => {
        content += `${index + 1}. ${q.question}\n`;
        if (q.type === QuestionType.MultipleChoice && q.options) {
            q.options.forEach((opt, i) => {
                content += `   ${String.fromCharCode(65 + i)}. ${opt}\n`;
            });
        }
        if (q.type === QuestionType.TrueFalse) {
            content += '   a. True\n';
            content += '   b. False\n';
        }
        content += `\nCorrect Answer: ${q.answer}\n\n`;
        content += '----------------------------------------\n\n';
    });
    
    downloadFile('quiz.doc', content, 'application/msword');
};

const handleExportCSV = (questions: QuizQuestion[]) => {
    const escapeCsvCell = (cell: string | number) => {
        const strCell = String(cell);
        if (strCell.includes(',') || strCell.includes('"') || strCell.includes('\n')) {
            return `"${strCell.replace(/"/g, '""')}"`;
        }
        return strCell;
    };
    
    const headers = ["ID", "Type", "Question", "Option 1", "Option 2", "Option 3", "Option 4", "Answer"];
    const rows = questions.map(q => [
        q.id,
        q.type,
        q.question,
        q.options?.[0] || '',
        q.options?.[1] || '',
        q.options?.[2] || '',
        q.options?.[3] || '',
        q.answer
    ].map(escapeCsvCell).join(','));

    const csvContent = [headers.join(','), ...rows].join('\r\n');
    
    downloadFile('quiz.csv', csvContent, 'text/csv;charset=utf-8;');
};

const ExportCard: React.FC<{ format: string; description: string; onExport: () => void; disabled: boolean; }> = ({ format, description, onExport, disabled }) => (
  <div className="bg-white dark:bg-gray-900/50 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center">
    <h3 className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-2">{format}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{description}</p>
    <button
      onClick={onExport}
      disabled={disabled}
      className="w-full bg-brand-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-brand-700 transition duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
    >
      Download
    </button>
  </div>
);

const ExportPage: React.FC<ExportPageProps> = ({ questions }) => {
  const isQuizEmpty = !questions || questions.length === 0;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Export Your Quiz</h2>
      {isQuizEmpty ? (
        <div className="text-center py-10 px-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-300 dark:border-yellow-800">
            <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-300">No Quiz to Export</h3>
            <p className="text-yellow-600 dark:text-yellow-400 mt-2">
                You need to generate some questions before you can export them.
                <br />
                Please go to the 'Upload' tab to get started.
            </p>
        </div>
      ) : (
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Choose your preferred format to download the quiz for printing or importing into your Learning Management System (LMS).</p>
      )}
      <div className={`grid md:grid-cols-3 gap-8 ${isQuizEmpty ? 'mt-0' : 'mt-8'}`}>
        <ExportCard 
          format="PDF" 
          description="Perfect for printing handouts or creating a digital quiz sheet. Standard A4 format." 
          onExport={() => handleExportPDF(questions)}
          disabled={isQuizEmpty}
        />
        <ExportCard 
          format="DOCX" 
          description="A Microsoft Word document for easy editing and customization before distribution."
          onExport={() => handleExportDOCX(questions)}
          disabled={isQuizEmpty}
        />
        <ExportCard 
          format="CSV" 
          description="A comma-separated values file, ideal for importing into Canvas, Moodle, or other LMS platforms." 
          onExport={() => handleExportCSV(questions)}
          disabled={isQuizEmpty}
        />
      </div>
    </div>
  );
};

export default ExportPage;