import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon } from '../ui/Icon';
import { GoogleGenAI, Type, GenerateContentResponse } from '@google/genai';
import { QuizQuestion } from '../../types';

interface UploadPageProps {
  setCurrentPage: (page: 'questions') => void;
  setIsQuizReady: (isReady: boolean) => void;
  setQuestions: (questions: QuizQuestion[]) => void;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // remove "data:application/pdf;base64," prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};


const UploadPage: React.FC<UploadPageProps> = ({ setCurrentPage, setIsQuizReady, setQuestions }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    numQuestions: 10,
    difficulty: 'Hard',
    mcqPercentage: 70,
    questionFocus: 'Comprehensive',
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
      setError(null);
    }
  }, []);

  const handleGenerate = async () => {
    if (!uploadedFile) {
        setError("Please upload a file first.");
        return;
    }
    
    setIsGenerating(true);
    setIsQuizReady(false);
    setError(null);
    setProgress(0);
    setStatusText('');

    try {
        setStatusText("Preparing your file...");
        setProgress(10);
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const base64File = await fileToBase64(uploadedFile);
        setProgress(25);
        setStatusText("Analyzing document with AI...");

        const filePart = {
            inlineData: {
                mimeType: uploadedFile.type,
                data: base64File,
            },
        };
        
        const numMcq = Math.round(settings.numQuestions * (settings.mcqPercentage / 100));
        const numTf = settings.numQuestions - numMcq;

        const textPart = {
            text: `Based on the content of the provided document, generate a quiz with exactly ${settings.numQuestions} questions.
            The difficulty level should be ${settings.difficulty}.
            The quiz must contain ${numMcq} multiple-choice questions and ${numTf} true/false questions.
            The questions should focus on: ${settings.questionFocus}.
            
            For multiple-choice questions, provide 4 distinct options, with one being the correct answer.
            For true/false questions, the answer must be either "True" or "False".
            
            Return the result as a valid JSON array of question objects, adhering to the provided schema.`
        };
        
        const responseSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    type: {
                        type: Type.STRING,
                        description: "The type of question, must be 'multiple-choice' or 'true-false'.",
                    },
                    question: {
                        type: Type.STRING,
                        description: "The text of the quiz question.",
                    },
                    options: {
                        type: Type.ARRAY,
                        description: "An array of 4 strings for 'multiple-choice' questions. This field must be omitted for 'true-false' questions.",
                        items: {
                            type: Type.STRING,
                        },
                    },
                    answer: {
                        type: Type.STRING,
                        description: "The correct answer. For 'multiple-choice', it must exactly match one of the options. For 'true-false', it must be 'True' or 'False'.",
                    },
                },
                required: ["type", "question", "answer"],
            },
        };
        
        setProgress(50);
        setStatusText(`Generating ${settings.numQuestions} questions...`);

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [filePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        setProgress(75);
        setStatusText("Finalizing questions...");

        const jsonText = response.text.trim();
        const generatedQuestions: Omit<QuizQuestion, 'id'>[] = JSON.parse(jsonText);
        
        if (generatedQuestions.length === 0) {
          throw new Error("AI returned an empty list of questions. The document might not have enough content.");
        }

        const questionsWithIds: QuizQuestion[] = generatedQuestions.map((q, index) => ({
            ...q,
            id: Date.now() + index,
        }));
        
        setQuestions(questionsWithIds);
        
        setProgress(100);
        setStatusText("Quiz is ready!");
        
        setIsQuizReady(true);
        setCurrentPage('questions');

    } catch (err) {
        console.error("Error generating quiz:", err);
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        setError(`An error occurred while generating the quiz: ${errorMessage}. Please check your document or settings and try again.`);
        setStatusText('Failed to generate quiz.');
        setIsGenerating(false);
    }
  };
  
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number' || type === 'range';
    setSettings(prev => ({
        ...prev,
        [name]: isNumber ? parseInt(value) : value,
    }));
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsGenerating(false);
    setProgress(0);
    setStatusText('');
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });
  
  const inputStyles = "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500";
  const labelStyles = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  if (isGenerating) {
    return (
       <div className="flex flex-col items-center justify-center h-96 bg-white dark:bg-gray-900/50 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
         <h3 className="text-2xl font-semibold mb-4">Generating Your Quiz...</h3>
         <div className="w-full max-w-md bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
           <div
             className="bg-gradient-to-r from-brand-500 to-brand-700 h-4 rounded-full transition-all duration-500 ease-out"
             style={{ width: `${progress}%` }}
           ></div>
         </div>
         <p className="text-gray-600 dark:text-gray-400 mt-2">{statusText}</p>
         {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
       </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Create New Quiz</h2>
      
      {!uploadedFile ? (
        <div className="bg-white dark:bg-gray-900/50 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
          <div
            {...getRootProps()}
            className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-brand-400'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <p className="text-lg font-semibold">Drag & drop your PDF here</p>
              <p>or click to select a file</p>
              <p className="text-sm mt-2">Only *.pdf files will be accepted</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900/50 p-6 rounded-lg shadow-md border-2 border-dashed border-gray-300 dark:border-gray-700">
                <div className="flex flex-col items-center text-center">
                    <Icon name="file" className="w-12 h-12 text-brand-500 mb-4"/>
                    <p className="font-semibold text-lg mb-4 truncate w-full max-w-md">{uploadedFile.name}</p>
                    <button 
                        onClick={handleRemoveFile}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm"
                    >
                        <Icon name="upload" className="w-4 h-4" />
                        <span>Upload a different file</span>
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900/50 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><Icon name="settings"/> Quiz Generation Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="numQuestions" className={labelStyles}>Number of Questions</label>
                        <input type="number" name="numQuestions" id="numQuestions" value={settings.numQuestions} onChange={handleSettingsChange} className={inputStyles} min="1" max="50"/>
                    </div>
                    <div>
                        <label htmlFor="difficulty" className={labelStyles}>Difficulty Level</label>
                        <div className="relative">
                            <select name="difficulty" id="difficulty" value={settings.difficulty} onChange={handleSettingsChange} className={`${inputStyles} appearance-none pr-8`}>
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                                <Icon name="chevron-down" className="w-5 h-5"/>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="mcqPercentage" className={labelStyles}>MCQ / True-False Ratio: {settings.mcqPercentage}% MCQ</label>
                        <input type="range" name="mcqPercentage" id="mcqPercentage" value={settings.mcqPercentage} onChange={handleSettingsChange} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-600" min="0" max="100" step="10"/>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="questionFocus" className={labelStyles}>Question Focus</label>
                         <div className="relative">
                            <select name="questionFocus" id="questionFocus" value={settings.questionFocus} onChange={handleSettingsChange} className={`${inputStyles} appearance-none pr-8`}>
                                <option>Comprehensive</option>
                                <option>Key Concepts</option>
                                <option>Vocabulary</option>
                                <option>Dates & Events</option>
                            </select>
                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                                <Icon name="chevron-down" className="w-5 h-5"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex items-center justify-center space-x-3 w-full max-w-xs px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-800 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Icon name="rocket" className="w-6 h-6"/>
                    <span className="text-lg">Generate Quiz Questions</span>
                </button>
            </div>
            {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default UploadPage;