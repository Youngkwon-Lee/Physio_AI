'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  videoPreview?: string;
}

const FileUpload = ({ onFileSelected, videoPreview }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(videoPreview || null);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLLabelElement | HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement | HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // Check if the file is a video
    if (file.type.startsWith('video/')) {
      // Create a URL for the video
      const videoUrl = URL.createObjectURL(file);
      setVideoSrc(videoUrl);
      onFileSelected(file);

      // Log file info for debugging
      console.log('File', file);
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChangeVideo = () => {
    // Reset video source and trigger new upload
    setVideoSrc(null);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <form
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
        className="w-full"
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          accept=".mp4,.mov"
          onChange={handleChange}
          className="hidden"
        />

        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={`flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
            dragActive ? 'border-[rgb(223,255,50)] bg-[rgb(223,255,50)]/10' : 'border-gray-200 hover:border-[rgb(223,255,50)]'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div style={{ zIndex: 1000 }}>
            {!videoSrc ? (
              <div className="text-center p-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H8m36-12h-4m-4 0v4m0 0H8m36 0h-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">영상을 드래그하여 놓거나 클릭하여 선택하세요</p>
                <p className="mt-1 text-xs text-gray-500">MP4 또는 MOV (최대 100MB)</p>
                <button
                  className="bg-[rgb(223,255,50)] text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[rgb(203,235,30)] transition-colors mt-4"
                  onClick={handleButtonClick}
                  type="button"
                >
                  영상 선택
                </button>
              </div>
            ) : (
              <div className="w-full h-64 relative">
                <video
                  ref={videoRef}
                  className="video-input-video w-full h-full object-contain"
                  controls
                  src={videoSrc}
                />
              </div>
            )}
          </div>
        </label>
      </form>

      {videoSrc && (
        <div className="mt-2 text-center">
          <button
            className="text-[rgb(223,255,50)] hover:text-[rgb(203,235,30)] text-sm font-medium transition-colors"
            onClick={handleChangeVideo}
          >
            영상 변경
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
