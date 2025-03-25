'use client';

import MainLayout from '@/components/layout/main-layout';
import VideoPlayer from '@/components/analysis/video-player';
import MetricsDisplay from '@/components/analysis/metrics-display';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function MetricsPage() {
  return (
    <MainLayout title="분석 지표">
      <div className="p-8">
        <div className="bg-white rounded-xl p-4 mb-6 shadow-md">
          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="grid grid-cols-4 w-full bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="analysis" asChild>
                <a href="/analysis/results" className="text-gray-600 hover:text-gray-900">분석</a>
              </TabsTrigger>
              <TabsTrigger value="metrics" className="data-[state=active]:bg-[rgb(223,255,50)] data-[state=active]:text-gray-900">
                지표
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

          {/* Metrics */}
          <div className="w-full">
            <div className="grid grid-cols-3 gap-6">
              {/* Time of flight */}
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
                <div className="text-5xl font-bold mb-1">0.55</div>
                <div className="text-gray-400 text-sm">Seconds</div>
                <div className="mt-2 text-center">Time of flight</div>
                <div className="mt-4 w-full">
                  <img
                    src="https://via.placeholder.com/180x40?text=Footprint+Visualization"
                    alt="Footprint visualization"
                    className="mx-auto"
                  />
                </div>
              </div>

              {/* Ground contact time */}
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
                <div className="text-5xl font-bold mb-1">0.33</div>
                <div className="text-gray-400 text-sm">Seconds</div>
                <div className="mt-2 text-center">Ground contact time</div>
                <div className="mt-4 w-full">
                  <img
                    src="https://via.placeholder.com/180x40?text=Footprint+Visualization"
                    alt="Footprint visualization"
                    className="mx-auto"
                  />
                </div>
              </div>

              {/* Step frequency */}
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
                <div className="text-5xl font-bold mb-1">139</div>
                <div className="text-gray-400 text-sm">Per minute</div>
                <div className="mt-2 text-center">Step frequency</div>
                <div className="mt-4 w-full">
                  <img
                    src="https://via.placeholder.com/180x40?text=Footprint+Visualization"
                    alt="Footprint visualization"
                    className="mx-auto"
                  />
                </div>
              </div>

              {/* Score */}
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
                <div className="text-5xl font-bold mb-1">72%</div>
                <div className="text-gray-400 text-sm">Overall</div>
                <div className="mt-2 text-center">Score</div>
              </div>

              {/* Stride length */}
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
                <div className="text-5xl font-bold mb-1">6</div>
                <div className="text-gray-400 text-sm">ft</div>
                <div className="mt-2 text-center">Stride length</div>
              </div>

              {/* Vertical oscillation */}
              <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center">
                <div className="text-5xl font-bold mb-1">3</div>
                <div className="text-gray-400 text-sm">inches</div>
                <div className="mt-2 text-center">Vertical oscillation</div>
              </div>
            </div>
          </div>

          {/* Information box */}
          <div className="mt-12 bg-zinc-900/70 rounded-md p-6">
            <h3 className="text-xl text-white mb-4">Time of flight</h3>
            <p className="text-sm text-gray-300 mb-4">
              Time of flight: Time during which both feet are off the ground during a running cycle. It was highlighted in a study that high-level runners ({"<"}32min at 10km) have a higher flight time than occasional runners ({">"} 38 min at 10km) by around 11% (Preece et al 2019).
            </p>
            <p className="text-sm text-gray-300">
              Runner with greater skill level tend to maintain higher time of flight, which can improve efficiency by allowing for more elastic energy storage and return.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
