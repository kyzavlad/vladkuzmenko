'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Target, TrendingUp, Users } from 'lucide-react';
import { Button } from './ui/button';

interface Question {
  id: string;
  question: string;
  options: {
    text: string;
    points: { [key: string]: number };
  }[];
}

const questions: Question[] = [
  {
    id: 'goal',
    question: "What's your primary goal right now?",
    options: [
      { text: "Build an online business", points: { ecommerce: 3, content: 2, ai: 1 } },
      { text: "Scale existing business", points: { ai: 3, sales: 2, markets: 1 } },
      { text: "Build personal brand", points: { content: 3, sales: 1, mindset: 1 } },
      { text: "Master high-income skills", points: { ai: 2, sales: 2, content: 1 } },
    ]
  },
  {
    id: 'experience',
    question: "What's your experience level?",
    options: [
      { text: "Complete beginner", points: { mindset: 3, ecommerce: 2, content: 1 } },
      { text: "Some experience", points: { content: 2, sales: 2, ai: 1 } },
      { text: "Experienced entrepreneur", points: { ai: 3, markets: 2, sales: 1 } },
      { text: "Advanced/Expert", points: { markets: 3, ai: 2, mindset: 1 } },
    ]
  },
  {
    id: 'interest',
    question: "What excites you most?",
    options: [
      { text: "Technology & Innovation", points: { ai: 3, content: 1 } },
      { text: "Human Psychology", points: { sales: 3, mindset: 2 } },
      { text: "Financial Markets", points: { markets: 3, ecommerce: 1 } },
      { text: "Creative Content", points: { content: 3, ecommerce: 1 } },
    ]
  },
];

export const SmartRecommendation = ({ 
  onClose, 
  onSelect 
}: { 
  onClose: () => void;
  onSelect: (index: number) => void;
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({
    ai: 0,
    content: 0,
    sales: 0,
    ecommerce: 0,
    mindset: 0,
    markets: 0,
  });

  const handleAnswer = (points: { [key: string]: number }) => {
    const newScores = { ...scores };
    Object.entries(points).forEach(([key, value]) => {
      newScores[key] = (newScores[key] || 0) + value;
    });
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate recommendation
      const topCampus = Object.entries(newScores).reduce((a, b) => 
        newScores[a[0]] > newScores[b[0]] ? a : b
      )[0];
      
      const campusMap: { [key: string]: number } = {
        ai: 0,
        content: 1,
        sales: 2,
        ecommerce: 3,
        mindset: 4,
        markets: 5,
      };
      
      onSelect(campusMap[topCampus]);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 max-w-2xl w-full"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Find Your Perfect Campus</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-zinc-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-zinc-800 rounded-full h-2 mb-8">
            <div 
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold mb-8">
                {questions[currentQuestion].question}
              </h3>
              
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswer(option.points)}
                    className="w-full p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-[#D4AF37]/50 transition-all duration-300 text-left group holographic"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{option.text}</span>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
