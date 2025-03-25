'use client';

import MainLayout from '@/components/layout/main-layout';
import VideoPlayer from '@/components/analysis/video-player';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function StylePage() {
  return (
    <MainLayout title="러닝 스타일">
      <div className="p-8">
        <div className="bg-white rounded-xl p-4 mb-6 shadow-md">
          <Tabs defaultValue="style" className="w-full">
            <TabsList className="grid grid-cols-4 w-full bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="analysis" asChild>
                <a href="/analysis/results" className="text-gray-600 hover:text-gray-900">분석</a>
              </TabsTrigger>
              <TabsTrigger value="metrics" asChild>
                <a href="/analysis/metrics" className="text-gray-600 hover:text-gray-900">지표</a>
              </TabsTrigger>
              <TabsTrigger value="graph" asChild>
                <a href="/analysis/graph" className="text-gray-600 hover:text-gray-900">그래프</a>
              </TabsTrigger>
              <TabsTrigger value="style" className="data-[state=active]:bg-[rgb(223,255,50)] data-[state=active]:text-gray-900">
                스타일
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

          {/* Style result */}
          <div className="bg-zinc-900 rounded-lg p-10 mb-8 text-center">
            <h2 className="text-2xl mb-6">Your running style: Push !</h2>

            <div className="w-48 h-48 mx-auto mb-6">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50,5 C70,5 90,25 95,50 C100,75 80,95 50,95 C20,95 0,75 5,50 C10,25 30,5 50,5 Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
                <path
                  d="M30,30 C35,25 40,20 50,20 C60,20 65,25 70,30"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
                <path
                  d="M20,50 C25,45 35,40 50,40 C65,40 75,45 80,50"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
                <path
                  d="M30,70 C35,65 40,60 50,60 C60,60 65,65 70,70"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
                <circle cx="25" cy="40" r="2" fill="white" />
                <circle cx="75" cy="40" r="2" fill="white" />
                <circle cx="50" cy="80" r="2" fill="white" />
              </svg>
            </div>

            <h3 className="text-2xl mb-3">Cheetah</h3>

            <div className="max-w-2xl mx-auto">
              <p className="mb-6 text-left">
                <span className="font-bold">Push:</span> Running style characterised by a relatively low step frequency and a medium stance phase.
                This running style is associated with a propulsion force oriented more horizontally due to the time of flight being shorter than
                maximally possible.
              </p>
            </div>
          </div>

          {/* Style explanations */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-zinc-900/70 rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">Hop</h3>
              <p className="text-sm text-gray-300">
                Defined by a high vertical oscillation, this style emphasizes lifting the body upward rather than forward during the propulsion phase.
              </p>
            </div>

            <div className="bg-zinc-900/70 rounded-md p-4 border-2 border-primary">
              <h3 className="text-lg font-semibold mb-2">Push</h3>
              <p className="text-sm text-gray-300">
                This running style is characterized with a moderate stance time and horizontal propulsion rather than vertical. The flight time is shorter than the maximum possible.
              </p>
            </div>

            <div className="bg-zinc-900/70 rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">Stick</h3>
              <p className="text-sm text-gray-300">
                Characterized by longer ground contact time and boasts a long stance phase with minimal vertical displacement. Beneficial at lower speeds and for energy conservation with reduced vertical impact.
              </p>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-400">
            <p>Source: Van Oeveren, B. T., De Ruiter, C. J., Beek, P. J., & Van Dieën, J. H. (2021). The biomechanics of running and running styles: A synthesis. Sports biomechanics.</p>
          </div>

          <div className="flex justify-end mt-8">
            <Button className="ochy-secondary-button">Export to PDF</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
