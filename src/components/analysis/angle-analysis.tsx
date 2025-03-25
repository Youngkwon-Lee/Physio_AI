'use client';

import { useState, useEffect } from 'react';
import MeasurementGauge from './measurement-gauge';

interface AngleData {
  leftKnee: number;
  rightKnee: number;
  leftHip: number;
  rightHip: number;
  leftAnkle: number;
  rightAnkle: number;
}

interface AngleAnalysisProps {
  angleData?: AngleData;
  selectedMetric?: string;
}

const defaultAngles: AngleData = {
  leftKnee: 155,
  rightKnee: 162,
  leftHip: 168,
  rightHip: 171,
  leftAnkle: 87,
  rightAnkle: 95
};

const AngleAnalysis = ({
  angleData = defaultAngles,
  selectedMetric = 'knee'
}: AngleAnalysisProps) => {
  const [angles, setAngles] = useState<AngleData>(angleData);
  const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');
  const [metricType, setMetricType] = useState<'knee' | 'hip' | 'ankle'>(selectedMetric as 'knee' | 'hip' | 'ankle');

  // Update angles when props change
  useEffect(() => {
    setAngles(angleData);
  }, [angleData]);

  // Helper function to get the correct angle value
  const getAngleValue = () => {
    if (metricType === 'knee') {
      return activeTab === 'left' ? angles.leftKnee : angles.rightKnee;
    } else if (metricType === 'hip') {
      return activeTab === 'left' ? angles.leftHip : angles.rightHip;
    } else {
      return activeTab === 'left' ? angles.leftAnkle : angles.rightAnkle;
    }
  };

  // Helper function to get the analysis status
  const getAnalysisStatus = () => {
    const value = getAngleValue();

    if (metricType === 'knee') {
      // For knee - ideal is around 160-170 degrees during stance
      if (value > 155 && value < 175) {
        return { status: '좋음', color: 'text-[rgb(223,255,50)]' };
      } else if (value > 145 && value < 185) {
        return { status: '보통', color: 'text-yellow-500' };
      } else {
        return { status: '나쁨', color: 'text-red-500' };
      }
    } else if (metricType === 'hip') {
      // For hip - ideal is around 165-175 degrees vertical alignment
      if (value > 160 && value < 180) {
        return { status: '좋음', color: 'text-[rgb(223,255,50)]' };
      } else if (value > 150 && value < 190) {
        return { status: '보통', color: 'text-yellow-500' };
      } else {
        return { status: '나쁨', color: 'text-red-500' };
      }
    } else {
      // For ankle - ideal is around 85-95 degrees (neutral pronation/supination)
      if (value > 85 && value < 95) {
        return { status: '중립', color: 'text-[rgb(223,255,50)]' };
      } else if (value < 85) {
        return { status: '회내', color: 'text-yellow-500' };
      } else {
        return { status: '회외', color: 'text-yellow-500' };
      }
    }
  };

  // Get recommendations based on analysis
  const getRecommendations = () => {
    const { status } = getAnalysisStatus();

    if (metricType === 'knee') {
      if (status === '좋음') {
        return [
          '장거리 러닝 시에도 좋은 자세 유지',
          '현재 근력 운동 루틴 유지'
        ];
      } else {
        return [
          '고관절과 대퇴사두근 강화 운동 필요',
          '무릎 부담을 줄이기 위해 보폭 줄이기 고려',
          '발 착지 기술 개선 필요'
        ];
      }
    } else if (metricType === 'hip') {
      if (status === '좋음') {
        return [
          '좋은 고관절 정렬은 코어 근력이 충분함을 의미',
          '코어와 둔근 운동 유지'
        ];
      } else {
        return [
          '고관절 외전근과 내전근 강화 필요',
          '코어 안정성 운동 추가',
          '자세 중심의 러닝 드릴 고려'
        ];
      }
    } else {
      if (status === '중립') {
        return [
          '발목 정렬이 좋습니다',
          '균형 및 고유수용성 운동 유지'
        ];
      } else if (status === '회내') {
        return [
          '안정성 신발이나 깔창 고려',
          '발 아치와 발목 근육 강화',
          '발 착지 기술에 집중'
        ];
      } else {
        return [
          '쿠션이 더 많은 신발이 충격 감소에 도움',
          '발목 가동성 운동으로 지지력 향상',
          '중족부 착지 기술 연습'
        ];
      }
    }
  };

  // Get appropriate min/max values for the gauge
  const getGaugeConfig = () => {
    if (metricType === 'knee') {
      return {
        min: 130,
        max: 190,
        warningLabel: '무릎 정렬 불량'
      };
    } else if (metricType === 'hip') {
      return {
        min: 140,
        max: 200,
        warningLabel: '과도한 골반 하강'
      };
    } else {
      return {
        min: 70,
        max: 110,
        warningLabel: activeTab === 'left' ? '과도한 회내 | 과도한 회외' : '과도한 회내 | 과도한 회외'
      };
    }
  };

  const { status, color } = getAnalysisStatus();
  const recommendations = getRecommendations();
  const gaugeConfig = getGaugeConfig();

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-gray-900">
            {activeTab === 'left' ? '왼쪽' : '오른쪽'} {metricType === 'knee' ? '무릎' : metricType === 'hip' ? '고관절' : '발목'} 각도 분석
          </h2>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${activeTab === 'left' ? 'bg-[rgb(223,255,50)] text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('left')}
            >
              왼쪽
            </button>
            <button
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${activeTab === 'right' ? 'bg-[rgb(223,255,50)] text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('right')}
            >
              오른쪽
            </button>
          </div>
        </div>

        <div className="flex space-x-2 mb-6">
          <button
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${metricType === 'knee' ? 'bg-[rgb(223,255,50)] text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setMetricType('knee')}
          >
            무릎
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${metricType === 'hip' ? 'bg-[rgb(223,255,50)] text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setMetricType('hip')}
          >
            고관절
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${metricType === 'ankle' ? 'bg-[rgb(223,255,50)] text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setMetricType('ankle')}
          >
            발목
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="mb-6 bg-gray-50 rounded-xl p-4">
          <div className="relative h-48 flex items-center justify-center">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              {metricType === 'knee' && (
                <>
                  <line x1="50" y1="20" x2="50" y2="80" stroke="#E5E7EB" strokeWidth="3" />
                  <line x1="50" y1="80" x2="100" y2="80" stroke="#E5E7EB" strokeWidth="3" />
                  <path
                    d={`M 50 20 L 50 80 L ${50 + Math.cos((180 - getAngleValue()) * Math.PI/180) * 50} ${80 - Math.sin((180 - getAngleValue()) * Math.PI/180) * 50}`}
                    stroke={activeTab === 'left' ? 'rgb(223,255,50)' : 'rgb(223,255,50)'}
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle cx="50" cy="80" r="5" fill={activeTab === 'left' ? 'rgb(223,255,50)' : 'rgb(223,255,50)'} />
                  <text x="120" y="50" fill="#111827" fontSize="12">{getAngleValue()}°</text>
                </>
              )}

              {metricType === 'hip' && (
                <>
                  <line x1="100" y1="20" x2="100" y2="80" stroke="#E5E7EB" strokeWidth="3" />
                  <line x1="50" y1="50" x2="150" y2="50" stroke="#E5E7EB" strokeWidth="3" />
                  <path
                    d={`M 100 20 L 100 80 L ${100 + Math.cos((180 - getAngleValue()) * Math.PI/180) * 50} ${50 - Math.sin((180 - getAngleValue()) * Math.PI/180) * 30}`}
                    stroke={activeTab === 'left' ? 'rgb(223,255,50)' : 'rgb(223,255,50)'}
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle cx="100" cy="50" r="5" fill={activeTab === 'left' ? 'rgb(223,255,50)' : 'rgb(223,255,50)'} />
                  <text x="120" y="30" fill="#111827" fontSize="12">{getAngleValue()}°</text>
                </>
              )}

              {metricType === 'ankle' && (
                <>
                  <line x1="100" y1="20" x2="100" y2="80" stroke="#E5E7EB" strokeWidth="3" />
                  <line x1="50" y1="50" x2="150" y2="50" stroke="#E5E7EB" strokeWidth="3" />
                  <path
                    d={`M 100 20 L 100 80 L ${100 + Math.cos((180 - getAngleValue()) * Math.PI/180) * 50} ${50 - Math.sin((180 - getAngleValue()) * Math.PI/180) * 30}`}
                    stroke={activeTab === 'left' ? 'rgb(223,255,50)' : 'rgb(223,255,50)'}
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle cx="100" cy="50" r="5" fill={activeTab === 'left' ? 'rgb(223,255,50)' : 'rgb(223,255,50)'} />
                  <text x="120" y="30" fill="#111827" fontSize="12">{getAngleValue()}°</text>
                </>
              )}
            </svg>
          </div>
        </div>

        <div className="flex-grow">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">분석</h3>
            <p className={`text-xl font-bold ${color}`}>{status}</p>
            <p className="text-gray-600 text-sm mt-2">
              {metricType === 'knee' && (
                '러닝 시 무릎 각도는 힘의 분산과 효율성에 영향을 미칩니다. 최적의 각도는 부상을 예방하고 효율적인 에너지 전달을 보장합니다.'
              )}
              {metricType === 'hip' && (
                '고관절 각도와 정렬은 골반 안정성, 보폭, 전반적인 러닝 역학에 직접적인 영향을 미칩니다. 올바른 정렬은 보상 부상을 예방합니다.'
              )}
              {metricType === 'ankle' && (
                '발 착지 시 발목 위치는 회내/회외 경향을 나타내며, 이는 충격이 신체를 통해 어떻게 분산되는지에 영향을 미칩니다.'
              )}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">권장사항</h3>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-[rgb(223,255,50)] mt-1.5 mr-2"></div>
                  <span className="text-sm text-gray-600">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AngleAnalysis;
