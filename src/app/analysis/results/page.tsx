'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import AnalysisCard from '@/components/analysis/analysis-card';
import PoseTracker from '@/components/analysis/pose-tracker';
import AngleAnalysis from '@/components/analysis/angle-analysis';
import InformationPanel from '@/components/analysis/information-panel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function AnalysisResultsPage() {
  const [activeTab, setActiveTab] = useState('analysis');
  const [selectedMetric, setSelectedMetric] = useState('pelvis-left');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [jointAngles, setJointAngles] = useState({
    leftKnee: 155,
    rightKnee: 162,
    leftHip: 168,
    rightHip: 171,
    leftAnkle: 87,
    rightAnkle: 95
  });

  // Load video URL from sessionStorage when component mounts
  useEffect(() => {
    const savedVideoUrl = sessionStorage.getItem('uploadedVideoUrl');
    if (savedVideoUrl) {
      setVideoUrl(savedVideoUrl);
    }
  }, []);

  const handleMetricClick = (metric: string) => {
    setSelectedMetric(metric);
  };

  const handlePoseUpdate = (angles: {
    leftKnee: number;
    rightKnee: number;
    leftHip: number;
    rightHip: number;
    leftAnkle: number;
    rightAnkle: number;
  }) => {
    setJointAngles(angles);
  };

  return (
    <MainLayout title="분석 결과">
      <div className="p-8">
        <div className="bg-white rounded-xl p-4 mb-6 shadow-md">
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid grid-cols-4 w-full bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="analysis" className="data-[state=active]:bg-[rgb(223,255,50)] data-[state=active]:text-gray-900">
                분석
              </TabsTrigger>
              <TabsTrigger value="metrics" asChild>
                <a href="/analysis/metrics" className="text-gray-600 hover:text-gray-900">지표</a>
              </TabsTrigger>
              <TabsTrigger value="graph" asChild>
                <a href="/analysis/graph" className="text-gray-600 hover:text-gray-900">그래프</a>
              </TabsTrigger>
              <TabsTrigger value="style" asChild>
                <a href="/analysis/style" className="text-gray-600 hover:text-gray-900">스타일</a>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex">
          <div className="w-1/4 pr-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <PoseTracker
                videoSrc={videoUrl || undefined}
                posterSrc="https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=500&auto=format&fit=crop"
                onPoseUpdate={handlePoseUpdate}
              />
            </div>
          </div>

          <div className="w-2/4 px-6">
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => handleMetricClick('pelvis-left')}
                className={`cursor-pointer ${selectedMetric === 'pelvis-left' ? 'ring-2 ring-[rgb(223,255,50)]' : ''}`}
              >
                <AnalysisCard
                  title="착지 시 골반 정렬 상태"
                  subtitle="왼쪽 고관절"
                  score="Good"
                />
              </div>

              <div
                onClick={() => handleMetricClick('pelvis-right')}
                className={`cursor-pointer ${selectedMetric === 'pelvis-right' ? 'ring-2 ring-[rgb(223,255,50)]' : ''}`}
              >
                <AnalysisCard
                  title="착지 시 경미한 골반 하강"
                  subtitle="오른쪽 고관절"
                  score="Okay"
                />
              </div>

              <div
                onClick={() => handleMetricClick('foot-left')}
                className={`cursor-pointer ${selectedMetric === 'foot-left' ? 'ring-2 ring-[rgb(223,255,50)]' : ''}`}
              >
                <AnalysisCard
                  title="중립"
                  subtitle="왼발"
                  score="Good"
                />
              </div>

              <div
                onClick={() => handleMetricClick('foot-right')}
                className={`cursor-pointer ${selectedMetric === 'foot-right' ? 'ring-2 ring-[rgb(223,255,50)]' : ''}`}
              >
                <AnalysisCard
                  title="회내"
                  subtitle="오른발"
                  score="Okay"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-medium text-gray-900 mb-4">골반 하강</h3>
                <p className="text-gray-600 mb-4">
                  러닝이나 걷기 시 골반의 위치를 나타냅니다. 오른쪽과 왼쪽 고관절 사이의 높이 차이를 측정합니다 (Pipkin et al. 2016).
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-[rgb(223,255,50)] mt-1.5 mr-2"></div>
                    <p className="text-sm text-gray-600">
                      골반 하강이 1° 증가할 때마다 부상 위험이 80% 증가합니다 (Bramah et al. 2018).
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-[rgb(223,255,50)] mt-1.5 mr-2"></div>
                    <p className="text-sm text-gray-600">
                      골반 하강은 러닝 관련 부상과 가장 강한 연관성을 보이는 변수 중 하나입니다 (Bramah et al. 2018).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/4 pl-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <AngleAnalysis
                angleData={jointAngles}
                selectedMetric={selectedMetric.includes('hip') ? 'hip' : selectedMetric.includes('foot') ? 'ankle' : 'knee'}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
