'use client';

import { ReactNode } from 'react';

interface AnalysisCardProps {
  title: string;
  subtitle: string;
  score: 'Good' | 'Okay' | 'Poor';
  children?: ReactNode;
}

const AnalysisCard = ({ title, subtitle, score, children }: AnalysisCardProps) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center mb-2">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
          score === 'Good'
            ? 'bg-[rgb(223,255,50)]'
            : score === 'Okay'
              ? 'bg-yellow-100'
              : 'bg-red-100'
        }`}>
          <span className={
            score === 'Good'
              ? 'text-gray-900'
              : score === 'Okay'
                ? 'text-yellow-600'
                : 'text-red-600'
          }>
            {subtitle.includes('고관절') ? '🦵' : '👣'}
          </span>
        </div>
        <div>
          <div className="text-xs text-gray-500">점수</div>
          <div className={`${
            score === 'Good'
              ? 'bg-[rgb(223,255,50)] text-gray-900'
              : score === 'Okay'
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-red-100 text-red-600'
          } px-3 py-1 rounded-full text-sm inline-block font-medium`}>
            {score === 'Good' ? '좋음' : score === 'Okay' ? '보통' : '나쁨'}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-gray-500 text-sm mb-1">{subtitle}</div>
        <h3 className="text-gray-900 text-lg font-medium">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default AnalysisCard;
