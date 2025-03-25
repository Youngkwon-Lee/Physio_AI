'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { UserCircle, Calendar, Ruler, Weight, Mail, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Analysis {
  id: string;
  date: string;
  type: '달리기' | '회내';
  score: number;
  status: '강점' | '약점';
}

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const [patient] = useState({
    id: params.id,
    name: '이영권',
    email: 'kwon2858@gmail.com',
    height: 176,
    weight: 80,
    lastAnalysis: '2024-03-15'
  });

  const [analyses] = useState<Analysis[]>([
    {
      id: '1',
      date: '2024-03-15',
      type: '달리기',
      score: 73,
      status: '강점'
    }
  ]);

  return (
    <MainLayout title="환자 정보" showBackButton>
      <div className="p-8 bg-white min-h-screen">
        {/* 환자 정보 카드 */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-[rgb(223,255,50)]/20 rounded-xl flex items-center justify-center">
                <UserCircle className="w-12 h-12 text-gray-600" />
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                <div className="flex items-center mt-2 text-gray-500">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{patient.email}</span>
                </div>
              </div>
            </div>
            <Link href={`/analysis/new?patientId=${patient.id}`}>
              <Button className="bg-[rgb(223,255,50)] hover:bg-[rgb(203,235,30)] text-gray-900">
                새 분석
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center text-gray-500 mb-2">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="text-sm">최근 분석일</span>
              </div>
              <div className="text-gray-900 font-medium">{patient.lastAnalysis}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center text-gray-500 mb-2">
                <Ruler className="w-5 h-5 mr-2" />
                <span className="text-sm">키</span>
              </div>
              <div className="text-gray-900 font-medium">{patient.height} cm</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center text-gray-500 mb-2">
                <Weight className="w-5 h-5 mr-2" />
                <span className="text-sm">체중</span>
              </div>
              <div className="text-gray-900 font-medium">{patient.weight} kg</div>
            </div>
          </div>
        </div>

        {/* 분석 기록 */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">분석 기록</h2>
          <div className="space-y-4">
            {analyses.map((analysis) => (
              <Link 
                key={analysis.id}
                href={`/analysis/${analysis.id}`}
                className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="text-gray-500">{analysis.date}</div>
                    <div className="px-3 py-1 rounded-full bg-gray-200 text-gray-700">
                      {analysis.type}
                    </div>
                    <div className={cn(
                      "flex items-center",
                      analysis.status === '강점' ? 'text-[rgb(223,255,50)]' : 'text-red-500'
                    )}>
                      <span className="font-bold">{analysis.score}%</span>
                      <span className="ml-2 text-sm text-gray-500">
                        {analysis.status}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400" />
                </div>
              </Link>
            ))}

            {analyses.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-gray-900 font-medium mb-2">분석 기록이 없습니다</h3>
                <p className="text-gray-500 mb-6">
                  새로운 분석을 시작하여 환자의 상태를 확인해보세요
                </p>
                <Link href={`/analysis/new?patientId=${patient.id}`}>
                  <Button className="bg-[rgb(223,255,50)] hover:bg-[rgb(203,235,30)] text-gray-900">
                    새 분석 시작
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
