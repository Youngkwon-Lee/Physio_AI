'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, UserCircle } from 'lucide-react';
import Link from 'next/link';

interface Patient {
  id: string;
  name: string;
  height: number;
  weight: number;
  lastAnalysis?: string;
  email?: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: '이영권',
      height: 176,
      weight: 80,
      lastAnalysis: '2024-03-15',
      email: 'kwon2858@gmail.com'
    },
    // 더미 데이터 추가 가능
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    height: '',
    weight: '',
    email: ''
  });

  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const patient: Patient = {
      id: (patients.length + 1).toString(),
      name: newPatient.name,
      height: Number(newPatient.height),
      weight: Number(newPatient.weight),
      email: newPatient.email
    };
    setPatients([...patients, patient]);
    setShowAddPatient(false);
    setNewPatient({ name: '', height: '', weight: '', email: '' });
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout title="환자 관리" showBackButton={false}>
      <div className="p-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-medium">환자 목록</h1>
          <Button
            className="bg-[rgb(223,255,50)] hover:bg-[rgb(203,235,30)] text-gray-900"
            onClick={() => setShowAddPatient(!showAddPatient)}
          >
            <Plus className="mr-2 h-4 w-4" />
            새 환자 등록
          </Button>
        </div>

        {/* 검색창 */}
        <div className="relative w-full mb-8 max-w-md">
          <Input
            type="text"
            placeholder="환자 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-50"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* 환자 추가 폼 */}
        {showAddPatient && (
          <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-medium mb-4">새 환자 등록</h2>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이름
                  </label>
                  <Input
                    required
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    className="bg-gray-50"
                    placeholder="환자 이름"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일
                  </label>
                  <Input
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                    className="bg-gray-50"
                    placeholder="이메일 주소"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    키 (cm)
                  </label>
                  <Input
                    required
                    type="number"
                    value={newPatient.height}
                    onChange={(e) => setNewPatient({ ...newPatient, height: e.target.value })}
                    className="bg-gray-50"
                    placeholder="키"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    체중 (kg)
                  </label>
                  <Input
                    required
                    type="number"
                    value={newPatient.weight}
                    onChange={(e) => setNewPatient({ ...newPatient, weight: e.target.value })}
                    className="bg-gray-50"
                    placeholder="체중"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddPatient(false)}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  className="bg-[rgb(223,255,50)] hover:bg-[rgb(203,235,30)] text-gray-900"
                >
                  등록
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* 환자 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Link key={patient.id} href={`/patients/${patient.id}`}>
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="bg-[rgb(223,255,50)]/20 text-gray-900 rounded-full p-3">
                    <UserCircle className="h-8 w-8" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                    {patient.email && (
                      <p className="text-sm text-gray-500">{patient.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex text-sm text-gray-500 space-x-4">
                  <span>{patient.height} cm</span>
                  <span>{patient.weight} kg</span>
                  {patient.lastAnalysis && (
                    <span className="ml-auto">최근 분석: {patient.lastAnalysis}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
