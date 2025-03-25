'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckIcon } from 'lucide-react';

interface InformationPanelProps {
  title: string;
  description: string;
  recapPoints?: string[];
  consequencesPoints?: string[];
  correctionPoints?: string[];
  defaultTab?: 'recap' | 'consequences' | 'correction';
}

const InformationPanel = ({
  title,
  description,
  recapPoints = [],
  consequencesPoints = [],
  correctionPoints = [],
  defaultTab = 'recap'
}: InformationPanelProps) => {
  return (
    <div>
      <div className="bg-zinc-900/70 rounded-md p-4 mb-6">
        <h3 className="text-xl text-primary mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-4">
          {description}
        </p>
      </div>

      <div className="mt-8">
        <Tabs defaultValue={defaultTab}>
          <TabsList className="w-full mb-6">
            <TabsTrigger value="recap" className="w-1/3 tab-button tab-button-active">Recap</TabsTrigger>
            <TabsTrigger value="consequences" className="w-1/3 tab-button">Consequences</TabsTrigger>
            <TabsTrigger value="correction" className="w-1/3 tab-button">Correction</TabsTrigger>
          </TabsList>

          <TabsContent value="recap">
            <ul className="space-y-3">
              {recapPoints.length > 0 ? (
                recapPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-sm">{point}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 text-sm">No recap information available.</li>
              )}
            </ul>
          </TabsContent>

          <TabsContent value="consequences">
            <ul className="space-y-3">
              {consequencesPoints.length > 0 ? (
                consequencesPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    <span className="text-sm">{point}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 text-sm">No consequences information available.</li>
              )}
            </ul>
          </TabsContent>

          <TabsContent value="correction">
            <ul className="space-y-3">
              {correctionPoints.length > 0 ? (
                correctionPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-sm">{point}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 text-sm">No correction information available.</li>
              )}
            </ul>
          </TabsContent>
        </Tabs>
      </div>

      {(title.includes('Pronation') || title.includes('Supination') || title.includes('Pelvic')) && (
        <div className="mt-8 text-center">
          <Button className="ochy-secondary-button">
            Read more 📚
          </Button>
        </div>
      )}
    </div>
  );
};

export default InformationPanel;
