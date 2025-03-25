'use client';

import MainLayout from '@/components/layout/main-layout';
import VideoPlayer from '@/components/analysis/video-player';
import JointAngles from '@/components/analysis/joint-angles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function GraphPage() {
  return (
    <MainLayout title="분석 그래프">
      <div className="p-8">
        <div className="bg-white rounded-xl p-4 mb-6 shadow-md">
          <Tabs defaultValue="graph" className="w-full">
            <TabsList className="grid grid-cols-4 w-full bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="analysis" asChild>
                <a href="/analysis/results" className="text-gray-600 hover:text-gray-900">분석</a>
              </TabsTrigger>
              <TabsTrigger value="metrics" asChild>
                <a href="/analysis/metrics" className="text-gray-600 hover:text-gray-900">지표</a>
              </TabsTrigger>
              <TabsTrigger value="graph" className="data-[state=active]:bg-[rgb(223,255,50)] data-[state=active]:text-gray-900">
                그래프
              </TabsTrigger>
              <TabsTrigger value="style" asChild>
                <a href="/analysis/style" className="text-gray-600 hover:text-gray-900">스타일</a>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-col">
          {/* Video player */}
          <div className="w-full mb-8 flex">
            <div className="w-1/3">
              <VideoPlayer
                posterSrc="https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=500&auto=format&fit=crop"
                videoSrc=""
              />
            </div>
          </div>

          {/* Graph title */}
          <h2 className="text-2xl mb-6 text-center">Joint Angles</h2>

          {/* Graph visualization */}
          <div className="bg-zinc-900 rounded-lg p-6 mb-8">
            <div className="h-64 w-full relative">
              {/* This would be a real graph in a production app */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="90%" height="85%" viewBox="0 0 600 300" className="mx-auto">
                  {/* Y Axis */}
                  <line x1="50" y1="50" x2="50" y2="250" stroke="#555" strokeWidth="2" />
                  {/* X Axis */}
                  <line x1="50" y1="250" x2="550" y2="250" stroke="#555" strokeWidth="2" />

                  {/* Labels */}
                  <text x="25" y="30" fill="#999" fontSize="12" textAnchor="middle">80°</text>
                  <text x="25" y="150" fill="#999" fontSize="12" textAnchor="middle">40°</text>
                  <text x="25" y="270" fill="#999" fontSize="12" textAnchor="middle">0°</text>

                  {/* Curve 1 - Knee angle */}
                  <path
                    d="M50,150 C150,80 220,180 300,100 S450,220 550,150"
                    fill="none"
                    stroke="#FF4D4F"
                    strokeWidth="3"
                  />

                  {/* Curve 2 - Hip angle */}
                  <path
                    d="M50,200 C150,220 250,230 350,180 S450,120 550,180"
                    fill="none"
                    stroke="#FF4D4F"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Joint angle controls */}
          <JointAngles />

          {/* Legend */}
          <div className="mt-8 flex justify-between items-center">
            <div className="flex">
              <div className="flex items-center mr-6">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <span>Left</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <span>Right</span>
              </div>
            </div>

            <Button className="ochy-secondary-button">Export to PDF</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
