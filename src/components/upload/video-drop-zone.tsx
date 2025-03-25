'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface VideoDropZoneProps {
  onFileAccepted?: (file: File) => void;
}

const VideoDropZone = ({ onFileAccepted }: VideoDropZoneProps) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileAccepted?.(file);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragAccept, open } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/quicktime': ['.mov'],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone flex flex-col items-center justify-center text-center p-16 ${
        isDragActive || isDragAccept ? 'dropzone-active' : ''
      }`}
    >
      <input {...getInputProps()} />

      <div className="h-28 w-28 mb-4 flex items-center justify-center">
        <Upload className="w-20 h-20 text-gray-500" strokeWidth={1} />
      </div>

      <h3 className="text-lg font-medium mb-1">Drop your video here or click to select one</h3>
      <p className="text-gray-500 text-sm mb-6">Only MP4 and MOV files are accepted</p>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
        className="ochy-primary-button px-8 py-2"
      >
        Choose a video
      </Button>
    </div>
  );
};

export default VideoDropZone;
