'use client';

import { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import VideoCriteria from '@/components/upload/video-criteria';
import FileUpload from '@/components/upload/file-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Camera, Upload, X } from 'lucide-react';

// Speed unit button
const SpeedUnitButton = ({
  children,
  active,
  onClick
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    className={`py-2 px-4 rounded-full ${
      active
        ? 'bg-primary text-white'
        : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default function UploadVideoPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [speedUnit, setSpeedUnit] = useState<'min/km' | 'min/mil' | 'km/h' | 'mil/h'>('km/h');
  const [speed, setSpeed] = useState('06.90');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stream]);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    // Create object URL for the uploaded file
    const videoUrl = URL.createObjectURL(file);
    sessionStorage.setItem('uploadedVideoUrl', videoUrl);
  };

  const handleStartAnalysis = () => {
    if (!selectedFile) return;

    // Simulate upload progress
    setUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        // Redirect to analysis results
        setTimeout(() => {
          router.push('/analysis/results');
        }, 1000);
      }
    }, 200);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(e.target.value);
  };

  const criteria = [
    'The camera is stable, not following the athlete',
    'The runner is side view and visible from head to toe',
    'There is only one person on the video'
  ];

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideo(url);
        setShowPreview(true);
        setRecordedChunks(chunks);
      };

      setTimeLeft(10);
      setIsRecording(true);
      mediaRecorder.start();

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // 10초 후 자동 정지
      setTimeout(() => {
        stopRecording();
      }, 10000);

    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setIsRecording(false);
    }
  };

  const handleUpload = async () => {
    if (recordedChunks.length === 0) return;

    const formData = new FormData();
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    formData.append('video', blob, 'recorded-video.webm');

    // TODO: API 호출로 비디오 업로드
    console.log('Uploading video...');
  };

  const resetRecording = () => {
    setRecordedVideo(null);
    setShowPreview(false);
    setRecordedChunks([]);
    setTimeLeft(10);
  };

  return (
    <MainLayout title="동영상 업로드" showBackButton>
      <div className="p-8 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              동영상 촬영 또는 업로드
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 촬영 섹션 */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-medium text-gray-900">카메라로 촬영</h2>
                <div className="aspect-video relative">
                  {!showPreview ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover rounded-lg bg-gray-100"
                    />
                  ) : (
                    <video
                      src={recordedVideo || undefined}
                      controls
                      className="w-full h-full object-cover rounded-lg bg-gray-100"
                    />
                  )}
                  
                  {isRecording && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                      {timeLeft}초
                    </div>
                  )}
                </div>

                <div className="flex justify-center space-x-4">
                  {!isRecording && !showPreview && (
                    <Button
                      onClick={startRecording}
                      className="bg-[rgb(223,255,50)] hover:bg-[rgb(203,235,30)] text-gray-900"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      촬영 시작
                    </Button>
                  )}
                  
                  {isRecording && (
                    <Button
                      onClick={stopRecording}
                      variant="destructive"
                    >
                      <X className="w-5 h-5 mr-2" />
                      촬영 중지
                    </Button>
                  )}

                  {showPreview && (
                    <>
                      <Button
                        onClick={resetRecording}
                        variant="outline"
                      >
                        다시 촬영
                      </Button>
                      <Button
                        onClick={handleUpload}
                        className="bg-[rgb(223,255,50)] hover:bg-[rgb(203,235,30)] text-gray-900"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        업로드
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* 파일 업로드 섹션 */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-medium text-gray-900">파일 업로드</h2>
                <div className="aspect-video flex items-center">
                  <FileUpload onFileSelected={handleFileSelected} />
                </div>
                {selectedFile && (
                  <div className="mt-4">
                    {uploading ? (
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-[rgb(223,255,50)] h-2.5 rounded-full transition-all duration-300" 
                          style={{ width: `${progress}%` }}
                        ></div>
                        <div className="text-center mt-2 text-sm text-gray-600">
                          분석 중... {progress}%
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={handleStartAnalysis}
                        className="bg-[rgb(223,255,50)] hover:bg-[rgb(203,235,30)] text-gray-900 w-full"
                      >
                        분석 시작
                      </Button>
                    )}
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  * 지원 형식: MP4, WebM (최대 10초)
                </div>
              </div>
            </div>
          </div>

          {/* 가이드라인 */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">촬영 가이드라인</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[rgb(223,255,50)] rounded-full mr-3" />
                촬영 시간은 최대 10초입니다.
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[rgb(223,255,50)] rounded-full mr-3" />
                환자의 전신이 잘 보이도록 촬영해주세요.
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[rgb(223,255,50)] rounded-full mr-3" />
                밝은 곳에서 촬영하시면 더 정확한 분석이 가능합니다.
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-[rgb(223,255,50)] rounded-full mr-3" />
                환자가 편안한 자세로 걷거나 달릴 수 있도록 해주세요.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
