"use client";

import React, { useState, useEffect } from 'react';
import quizData from '../quiz.json';

// Type definitions based on quiz.json structure
interface Option {
  text: string;
  answer: boolean;
}

interface Question {
  level: string;
  question: string;
  type: string;
  options: Option[];
  description: string;
}

interface QuizNode {
  node: string;
  questions: Question[];
}

export default function GettingStartedQuizPage() {
  const [questions, setQuestions] = useState<(Question & { node: string })[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    // Flatten all questions and attach the node topic to them
    const allQuestions: (Question & { node: string })[] = [];
    (quizData as QuizNode[]).forEach(node => {
      node.questions.forEach(q => {
        allQuestions.push({ ...q, node: node.node });
      });
    });

    // Shuffle and pick 15 random questions
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 15));
  }, []);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    
    setUserAnswers(prev => [...prev, selectedOption]);
    setSelectedOption(null);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="content-area d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Results Screen
  if (isFinished) {
    let score = 0;
    questions.forEach((q, idx) => {
      if (q.options[userAnswers[idx]].answer) {
        score++;
      }
    });

    return (
      <div className="content-area">
        <style>{`
          @keyframes slideFadeIn {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .quiz-card-enter {
            animation: slideFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            opacity: 0; /* Base state before animation */
          }
        `}</style>
        <div className="container-fluid py-5 px-md-5">
          <div className="page-intro-header mb-5 text-center text-md-start">
            <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Knowledge Check: Results</h1>
            <p className="text-secondary opacity-75 fs-5 mb-0">
              You scored {score} out of {questions.length} ({Math.round((score / questions.length) * 100)}%)
            </p>
          </div>

          <div className="doc-content-grid">
            {questions.map((q, idx) => {
              const userAnswer = userAnswers[idx];
              const isCorrect = q.options[userAnswer].answer;
              const correctOptionIndex = q.options.findIndex(opt => opt.answer);

              return (
                <div 
                  key={idx} 
                  className={`quiz-card-enter doc-section-card shadow-lg mb-4 border ${isCorrect ? 'border-success' : 'border-danger'}`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="doc-card-header-wrapper">
                    <div className={`heading-icon ${isCorrect ? 'text-success' : 'text-danger'}`}>
                      <i className={`bi ${isCorrect ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`}></i>
                    </div>
                    <h3 className="doc-card-heading fs-5 mb-0" style={{lineHeight: 1.4}}>
                      <span className="text-secondary x-small fw-bold text-uppercase d-block mb-1">{q.node}</span>
                      {idx + 1}. {q.question}
                    </h3>
                  </div>
                  <div className="doc-card-body pt-3">
                    <div className="row g-3 mb-3">
                      {q.options.map((opt, optIdx) => {
                        let bgColor = "bg-dark bg-opacity-25";
                        let borderColor = "border-secondary border-opacity-25";
                        
                        if (opt.answer) {
                          bgColor = "bg-success bg-opacity-10";
                          borderColor = "border-success";
                        } else if (optIdx === userAnswer && !opt.answer) {
                          bgColor = "bg-danger bg-opacity-10";
                          borderColor = "border-danger";
                        }

                        return (
                          <div key={optIdx} className="col-12">
                            <div className={`p-3 rounded border ${borderColor} ${bgColor} small`}>
                              {opt.text}
                              {opt.answer && <i className="bi bi-check2 float-end text-success fs-5"></i>}
                              {(optIdx === userAnswer && !opt.answer) && <i className="bi bi-x float-end text-danger fs-5"></i>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="doc-alert doc-alert-info mt-3 p-3 rounded">
                      <p className="mb-0 small"><i className="bi bi-info-circle-fill me-2"></i><strong>Explanation:</strong> {q.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-5">
            <button 
              className="btn btn-outline-primary px-4 py-2 fw-bold"
              onClick={() => window.location.reload()}
            >
              <i className="bi bi-arrow-clockwise me-2"></i> Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex) / questions.length) * 100;

  return (
    <div className="content-area">
      <style>{`
        @keyframes slideFadeIn {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .quiz-card-enter {
          animation: slideFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }
      `}</style>
      <div className="container-fluid py-5 px-md-5">

        {/* PAGE HEADER */}
        <div className="page-intro-header mb-5 text-center text-md-start">
          <h1 className="doc-section-title mb-2" style={{ fontSize: '42px' }}>Getting Started Knowledge Check</h1>
          <p className="text-secondary opacity-75 fs-5 mb-4">
            Test your understanding of the core Docker concepts covered so far.
          </p>

          {/* Progress Bar */}
          <div className="d-flex justify-content-between text-secondary small mb-2 fw-bold">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>{Math.round(progressPercent)}% Completed</span>
          </div>
          <div className="progress bg-dark bg-opacity-50" style={{ height: '8px' }}>
            <div 
              className="progress-bar bg-primary" 
              role="progressbar" 
              style={{ width: `${progressPercent}%`, transition: 'width 0.3s ease' }}
              aria-valuenow={progressPercent} 
              aria-valuemin={0} 
              aria-valuemax={100}
            ></div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div key={currentIndex} className="quiz-card-enter doc-section-card shadow-lg p-0 border border-primary border-opacity-25">
              <div className="p-4 bg-dark bg-opacity-10 border-bottom border-primary border-opacity-10">
                <div className="text-primary x-small fw-bold text-uppercase mb-2 tracking-wider">
                  Topic: {currentQ.node}
                </div>
                <h2 className="fs-4 fw-bold m-0" style={{ lineHeight: 1.4 }}>
                  {currentQ.question}
                </h2>
              </div>

              <div className="p-4 p-md-5">
                <div className="d-flex flex-column gap-3">
                  {currentQ.options.map((opt, idx) => (
                    <label 
                      key={idx} 
                      className={`
                        p-4 rounded border cursor-pointer position-relative flex-grow-1
                        ${selectedOption === idx 
                          ? 'border-primary bg-primary bg-opacity-10' 
                          : 'border-secondary border-opacity-25 bg-dark bg-opacity-25 hover-bg-light-opacity'
                        }
                      `}
                      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                      <div className="d-flex align-items-center">
                        <div 
                          className={`
                            rounded-circle border d-flex justify-content-center align-items-center me-3 flex-shrink-0
                            ${selectedOption === idx ? 'border-primary' : 'border-secondary'}
                          `}
                          style={{ width: '24px', height: '24px' }}
                        >
                          {selectedOption === idx && <div className="rounded-circle bg-primary" style={{ width: '12px', height: '12px' }}></div>}
                        </div>
                        <span className="fs-6">{opt.text}</span>
                      </div>
                      <input 
                        type="radio" 
                        name="quiz-option" 
                        className="d-none" 
                        checked={selectedOption === idx}
                        onChange={() => handleOptionSelect(idx)}
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-5 text-end">
                  <button 
                    className={`btn btn-primary px-5 py-2 fw-bold text-white ${selectedOption === null ? 'disabled opacity-50' : ''}`}
                    onClick={handleNext}
                    disabled={selectedOption === null}
                  >
                    {currentIndex === questions.length - 1 ? 'Submit File' : 'Next Question'}
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
