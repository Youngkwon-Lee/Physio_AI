'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PauseIcon, PlayIcon, VolumeXIcon, Volume2Icon, MaximizeIcon, MoreVerticalIcon } from 'lucide-react';

interface VideoPlayerProps {
  videoSrc: string;
  posterSrc?: string;
}

const VideoPlayer = ({ videoSrc, posterSrc }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState('0:00');

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className="relative h-64 w-full">
        <div className="absolute inset-0 bg-gray-50">
          {videoSrc ? (
            <video
              src={videoSrc}
              poster={posterSrc}
              className="w-full h-full object-cover"
              muted={isMuted}
              autoPlay={false}
            />
          ) : (
            posterSrc && (
              <img
                src={posterSrc}
                alt="비디오 미리보기"
                className="w-full h-full object-cover"
              />
            )
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2 flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="p-1 mr-2 hover:bg-white/10 rounded transition-colors"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <span className="inline-block w-4 h-4 bg-white"></span>
              ) : (
                <span className="inline-block w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-r-0 border-solid border-t-transparent border-b-transparent border-l-white"></span>
              )}
            </button>
            <span className="text-xs text-white">{currentTime}</span>
          </div>
          <button
            className="p-1 hover:bg-white/10 rounded transition-colors"
            onClick={handleMuteToggle}
          >
            <span className="text-white text-xs">
              {isMuted ? '음소거' : '음소거 해제'}
            </span>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <button
            className="bg-[rgb(223,255,50)] text-gray-900 px-4 py-1 rounded-lg text-sm font-medium hover:bg-[rgb(203,235,30)] transition-colors"
            onClick={handlePlayPause}
          >
            {isPlaying ? '일시정지' : '재생'}
          </button>
          <div className="text-gray-600 text-sm">
            동작 분석 중
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
