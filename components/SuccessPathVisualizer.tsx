'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, TrendingUp, Award, Crown } from 'lucide-react';
import { Button } from './ui/button';

interface PathNode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  connections: string[];
  product?: string;
}

export const SuccessPathVisualizer = ({ onClose }: { onClose: () => void }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState(0);

  const pathNodes: PathNode[] = [
    {
      id: 'start',
      title: 'Your Current Position',
      description: 'Where you are now - ready for transformation',
      icon: <Target className="h-6 w-6" />,
      position: { x: 50, y: 80 },
      connections: ['skill', 'mindset'],
    },
    {
      id: 'skill',
      title: 'Master High-Income Skills',
      description: 'Learn AI, sales, content creation',
      icon: <TrendingUp className="h-6 w-6" />,
      position: { x: 30, y: 50 },
      connections: ['automation', 'community'],
      product: 'The University',
    },
    {
      id: 'mindset',
      title: 'Develop Warrior Mindset',
      description: 'Build discipline and mental fortitude',
      icon: <Award className="h-6 w-6" />,
      position: { x: 70, y: 50 },
      connections: ['community', 'automation'],
      product: 'Warriors Team',
    },
    {
      id: 'automation',
      title: 'Implement AI Systems',
      description: 'Automate and scale your business',
      icon: <TrendingUp className="h-6 w-6" />,
      position: { x: 30, y: 20 },
      connections: ['success'],
      product: 'AI Automation Agency',
    },
    {
      id: 'community',
      title: 'Join Elite Network',
      description: 'Connect with successful entrepreneurs',
      icon: <Award className="h-6 w-6" />,
      position: { x: 70, y: 20 },
      connections: ['success'],
      product: 'Warriors Team',
    },
    {
      id: 'success',
      title: 'Financial Freedom',
      description: 'Your empire is built',
      icon: <Crown className="h-6 w-6 text-[#FFD700]" />,
      position: { x: 50, y: 5 },
      connections: [],
    },
  ];

  const getNodeByLevel = (level: number) => {
    const levels = [
      ['start'],
      ['skill', 'mindset'],
      ['automation', 'community'],
      ['success']
    ];
    return levels[level] || [];
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
          className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold gold-gradient">Your Success Path</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-zinc-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Path Visualization */}
          <div className="relative h-[400px] mb-8">
            <svg className="absolute inset-0 w-full h-full">
              {/* Draw connections */}
              {pathNodes.map(node => 
                node.connections.map(targetId => {
                  const target = pathNodes.find(n => n.id === targetId);
                  if (!target) return null;
                  
                  return (
                    <motion.line
                      key={`${node.id}-${targetId}`}
                      x1={`${node.position.x}%`}
                      y1={`${node.position.y}%`}
                      x2={`${target.position.x}%`}
                      y2={`${target.position.y}%`}
                      stroke="#FFD700"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  );
                })
              )}
            </svg>

            {/* Render nodes */}
            {pathNodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
              >
                <motion.div
                  className={`path-node ${selectedNode === node.id ? 'ring-4 ring-[#FFD700]' : ''}`}
                  onClick={() => setSelectedNode(node.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {node.icon}
                </motion.div>
                <p className="absolute top-full mt-2 text-xs text-center whitespace-nowrap">
                  {node.title}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Selected Node Details */}
          <AnimatePresence mode="wait">
            {selectedNode && (
              <motion.div
                key={selectedNode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
              >
                <h3 className="text-xl font-bold mb-2">
                  {pathNodes.find(n => n.id === selectedNode)?.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {pathNodes.find(n => n.id === selectedNode)?.description}
                </p>
                {pathNodes.find(n => n.id === selectedNode)?.product && (
                  <div className="flex gap-4">
                    <Button className="bg-gradient-to-r from-[#FFD700] to-[#FFC107] text-black">
                      Learn More About {pathNodes.find(n => n.id === selectedNode)?.product}
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Journey */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 mb-4">
              Click on any node to explore your path to success
            </p>
            <Button
              variant="outline"
              onClick={() => {
                const levels = getNodeByLevel(currentLevel + 1);
                if (levels.length > 0) {
                  setSelectedNode(levels[0]);
                  setCurrentLevel(currentLevel + 1);
                }
              }}
              className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10"
            >
              Show Me The Next Step →
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
