'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PlanFeature {
  included: boolean;
  text: string;
}

interface Plan {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  buttonText: string;
  popular?: boolean;
}

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans: Plan[] = [
    {
      name: '무료 체험',
      price: '0',
      description: '7일 동안 모든 기능을 무료로 체험해보세요',
      features: [
        { included: true, text: '7일 무료 체험' },
        { included: true, text: '10회 동작 분석' },
        { included: true, text: '기본 리포트 제공' },
        { included: false, text: '상세 분석 리포트' },
        { included: false, text: '환자 관리 기능' },
        { included: false, text: '데이터 내보내기' },
      ],
      buttonText: '무료로 시작하기'
    },
    {
      name: '프로',
      price: billingCycle === 'monthly' ? '49,900' : '499,000',
      description: '전문가를 위한 모든 기능을 제공합니다',
      features: [
        { included: true, text: '무제한 동작 분석' },
        { included: true, text: '상세 분석 리포트' },
        { included: true, text: '환자 관리 기능' },
        { included: true, text: '데이터 내보내기' },
        { included: true, text: '우선 기술 지원' },
        { included: true, text: 'API 액세스' },
      ],
      buttonText: '프로 시작하기',
      popular: true
    },
    {
      name: '팀',
      price: billingCycle === 'monthly' ? '99,900' : '999,000',
      description: '팀을 위한 고급 기능과 협업 도구를 제공합니다',
      features: [
        { included: true, text: '프로의 모든 기능' },
        { included: true, text: '팀원 5명까지' },
        { included: true, text: '팀 대시보드' },
        { included: true, text: '고급 분석 도구' },
        { included: true, text: '맞춤형 보고서' },
        { included: true, text: '전담 매니저' },
      ],
      buttonText: '팀 플랜 시작하기'
    }
  ];

  return (
    <MainLayout title="구독" showBackButton={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            당신의 요구사항에 맞는 플랜을 선택하세요
          </h1>
          <p className="text-xl text-gray-500">
            모든 플랜은 7일 무료 체험 기간을 제공합니다
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-xl">
            <Button
              variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
              onClick={() => setBillingCycle('monthly')}
              className={billingCycle === 'monthly' ? 'bg-[rgb(223,255,50)] text-gray-900' : ''}
            >
              월간 결제
            </Button>
            <Button
              variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
              onClick={() => setBillingCycle('yearly')}
              className={billingCycle === 'yearly' ? 'bg-[rgb(223,255,50)] text-gray-900' : ''}
            >
              연간 결제
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                20% 할인
              </span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-[rgb(223,255,50)]' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-[rgb(223,255,50)] text-gray-900 text-sm text-center py-2 font-medium">
                  가장 인기 있는 플랜
                </div>
              )}
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-500 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">₩{plan.price}</span>
                  <span className="text-gray-500 ml-2">
                    /{billingCycle === 'monthly' ? '월' : '년'}
                  </span>
                </div>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-[rgb(223,255,50)] hover:bg-[rgb(203,235,30)] text-gray-900'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {plan.buttonText}
                </Button>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                        feature.included ? 'bg-[rgb(223,255,50)]' : 'bg-gray-100'
                      }`}>
                        <Check className={`h-4 w-4 ${
                          feature.included ? 'text-gray-900' : 'text-gray-400'
                        }`} />
                      </div>
                      <span className={`ml-3 text-sm ${
                        feature.included ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            자주 묻는 질문
          </h2>
          <div className="max-w-3xl mx-auto grid gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 text-left">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                무료 체험은 어떻게 시작하나요?
              </h3>
              <p className="text-gray-500">
                회원가입 후 바로 7일간의 무료 체험 기간이 시작됩니다. 이 기간 동안 프로 플랜의 모든 기능을 제한 없이 사용해보실 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-left">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                결제는 언제 시작되나요?
              </h3>
              <p className="text-gray-500">
                무료 체험 기간이 종료된 후에 자동으로 결제가 시작됩니다. 체험 기간 중 언제든지 구독을 취소하실 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-left">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                플랜을 변경할 수 있나요?
              </h3>
              <p className="text-gray-500">
                네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경된 요금은 다음 결제 주기부터 적용됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
