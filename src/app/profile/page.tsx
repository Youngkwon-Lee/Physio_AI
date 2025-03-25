'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth-context';
import { Camera, Settings, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: 'lee youngkwon',
    email: 'kwon3858@gmail.com',
    plan: '7 Days Free Trial',
    monthlyAnalysis: '9/10',
    additionalAnalysis: '0'
  });

  return (
    <MainLayout title="내 정보" showBackButton={false}>
      <div className="p-8 bg-white min-h-screen">
        {/* 프로필 카드 */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-md">
          <div className="flex items-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-[rgb(223,255,50)]/20 rounded-full flex items-center justify-center overflow-hidden">
                <img src="/doctor-avatar.png" alt="의사 아바타" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 right-0 bg-[rgb(223,255,50)] w-6 h-6 rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-gray-900" />
                </div>
              </div>
            </div>
            <div className="ml-6">
              <h1 className="text-2xl text-gray-900 mb-1 font-bold">{profileData.name}</h1>
              <p className="text-gray-500">{profileData.email}</p>
            </div>
            <Button
              variant="link"
              className="ml-auto text-gray-600 hover:text-gray-900"
              onClick={() => {}}
            >
              수정
            </Button>
          </div>

          {/* 구독 정보 */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-gray-600 mb-2">현재 구독:</div>
            <div className="text-[rgb(223,255,50)] font-bold mb-4">{profileData.plan}</div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>월간 분석 횟수:</span>
              <span>{profileData.monthlyAnalysis}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-4">
              <span>추가 분석 횟수:</span>
              <span>{profileData.additionalAnalysis}</span>
            </div>
            <Link href="/subscription">
              <Button className="w-full bg-[rgb(223,255,50)] hover:bg-[rgb(203,235,30)] text-gray-900">
                구독 플랜 변경
              </Button>
            </Link>
          </div>
        </div>

        {/* 조직 정보 */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-md">
          <h2 className="text-gray-900 mb-4 font-bold">소속 기관</h2>
          <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center border-2 border-dashed border-gray-300">
            <Camera className="w-12 h-12 text-gray-400" />
          </div>
          <Input
            placeholder="기관명을 입력하세요"
            className="mt-4 bg-gray-50 border-gray-200 text-gray-900"
          />
          <Button
            className="w-full mt-4 bg-[rgb(223,255,50)] hover:bg-[rgb(203,235,30)] text-gray-900"
          >
            저장
          </Button>
        </div>

        {/* 통계 */}
        <div className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-gray-900 mb-6 font-bold">통계</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-gray-900 mb-4 font-medium">총 분석 횟수:</h3>
              <div className="text-center">
                <span className="text-[rgb(223,255,50)] text-4xl font-bold">1</span>
              </div>
              <div className="flex justify-between mt-4 text-gray-600">
                <div>
                  <div>달리기</div>
                  <div className="text-[rgb(223,255,50)] text-2xl text-center font-bold">1</div>
                </div>
                <div className="border-l border-gray-200 pl-8">
                  <div>회내</div>
                  <div className="text-[rgb(223,255,50)] text-2xl text-center font-bold">0</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-gray-900 mb-4 font-medium">환자 평균 점수</h3>
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-[rgb(223,255,50)] text-2xl mb-2 font-bold">73%</div>
                  <div className="text-gray-600">강점</div>
                </div>
                <div className="text-center">
                  <div className="text-red-500 text-2xl mb-2 font-bold">-</div>
                  <div className="text-gray-600">약점</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-gray-900 mb-4 font-medium">환자 순위:</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">1.</span>
                  <span className="text-gray-900">lee youngkwon</span>
                </div>
                <span className="text-[rgb(223,255,50)] font-bold">73%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 설정 버튼 */}
        <div className="fixed bottom-8 left-8">
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200"
          >
            <Settings className="w-5 h-5" />
            <span className="ml-2">설정</span>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
