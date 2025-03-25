'use client';

import MainLayout from '@/components/layout/main-layout';
import Image from 'next/image';
import Link from 'next/link';

// More modern style images that better match the latest screenshots
const runningImg = "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=500&auto=format&fit=crop";
const treadmillImg = "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=500&auto=format&fit=crop";
const gymImg = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop";
const treadmillBackImg = "https://images.unsplash.com/photo-1630395822970-acd6a28c8e49?q=80&w=500&auto=format&fit=crop";

export default function AnalysisPage() {
  return (
    <MainLayout showBackButton={false}>
      <div className="flex flex-col p-8">
        <div className="flex mb-8">
          <div className="w-1/2">
            <h1 className="text-2xl font-medium mb-6 text-gray-900">측면 러닝 분석</h1>
            <div className="grid grid-cols-1 gap-6">
              <AnalysisCard
                title="러닝"
                description="전체적인 러닝 자세를 분석합니다. 진단에 필요한 지표와 데이터를 제공합니다."
                imageSrc={runningImg}
              />

              <AnalysisCard
                title="트레드밀"
                description="트레드밀 위에서의 러닝 자세를 분석합니다. 진단에 필요한 지표와 데이터를 제공합니다."
                imageSrc={treadmillImg}
              />
            </div>
          </div>

          <div className="w-1/2 pl-8">
            <h1 className="text-2xl font-medium mb-6 text-gray-900">후면 러닝 분석</h1>
            <div className="grid grid-cols-1 gap-6">
              <AnalysisCard
                title="트레드밀 - 전신"
                description="발의 회내/회외 정도와 부상으로 이어질 수 있는 잠재적 불균형을 확인할 수 있습니다."
                imageSrc={treadmillBackImg}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

interface AnalysisCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const AnalysisCard = ({ title, description, imageSrc }: AnalysisCardProps) => {
  return (
    <Link href="/upload-video" className="block">
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <h2 className="text-xl font-medium mb-3 text-gray-900">{title}</h2>
        <p className="text-gray-600 mb-4 text-sm">
          {description}
        </p>
        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-xl">
          <Image
            src={imageSrc}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">촬영 가이드를 참고하세요</p>
          <div className="bg-[rgb(223,255,50)] text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[rgb(203,235,30)] transition-colors">
            분석 시작
          </div>
        </div>
      </div>
    </Link>
  );
};
