'use client';

import { useEffect, useRef, useState } from 'react';
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';

interface PoseTrackerProps {
  videoSrc?: string;
  posterSrc?: string;
  onPoseUpdate?: (angles: {
    leftKnee: number;
    rightKnee: number;
    leftHip: number;
    rightHip: number;
    leftAnkle: number;
    rightAnkle: number;
  }) => void;
}

interface Keypoint {
  x: number;
  y: number;
  score?: number;
  name: string;
}

const PoseTracker = ({ videoSrc, posterSrc, onPoseUpdate }: PoseTrackerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState('tennis');
  const requestRef = useRef<number>();
  const frameCountRef = useRef(0);
  const frameSkip = 5; // 프레임 처리 간격을 늘림 (3 -> 5)

  // 이동 평균을 위한 상태
  const angleHistoryRef = useRef<{
    leftKnee: number[];
    rightKnee: number[];
    leftHip: number[];
    rightHip: number[];
    leftAnkle: number[];
    rightAnkle: number[];
  }>({
    leftKnee: [],
    rightKnee: [],
    leftHip: [],
    rightHip: [],
    leftAnkle: [],
    rightAnkle: [],
  });

  const HISTORY_SIZE = 10; // 이동 평균에 사용할 이전 값의 개수

  // 이동 평균 계산 함수
  const calculateMovingAverage = (angles: {
    leftKnee: number;
    rightKnee: number;
    leftHip: number;
    rightHip: number;
    leftAnkle: number;
    rightAnkle: number;
  }) => {
    const history = angleHistoryRef.current;
    
    // 각 각도에 대해 히스토리 업데이트
    Object.entries(angles).forEach(([key, value]) => {
      const typedKey = key as keyof typeof angles;
      history[typedKey].push(value);
      if (history[typedKey].length > HISTORY_SIZE) {
        history[typedKey].shift();
      }
    });

    // 각 각도에 대해 이동 평균 계산
    const smoothedAngles = Object.entries(angles).reduce((acc, [key]) => {
      const typedKey = key as keyof typeof angles;
      const values = history[typedKey];
      const average = values.reduce((sum, val) => sum + val, 0) / values.length;
      return { ...acc, [key]: Number(average.toFixed(1)) };
    }, {} as typeof angles);

    return smoothedAngles;
  };

  // Add debugging info
  console.log('PoseTracker component rendering');

  // Colors for different body parts
  const colors = {
    leftSide: 'rgb(223,255,50)', // 메인 컬러
    rightSide: 'rgb(223,255,50)', // 메인 컬러
    torso: 'rgb(223,255,50)', // 메인 컬러
  };

  // Initialize the pose detector model
  useEffect(() => {
    console.log('Loading pose detection model');
    async function loadModel() {
      try {
        // Load TensorFlow.js dependencies
        console.log('Initializing TensorFlow.js');
        await tf.ready();

        // Load MoveNet model - better balance of speed and accuracy than PoseNet
        const detectorConfig = {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
          enableSmoothing: true,
        };

        console.log('Creating pose detector with config:', detectorConfig);
        try {
          const detector = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet,
            detectorConfig
          );
          console.log('Pose detector created successfully');
          setDetector(detector);
          setLoading(false);
        } catch (error) {
          console.error('Failed to load pose detection model:', error);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in loadModel:', error);
        setLoading(false);
      }
    }

    loadModel();

    // Clean up on unmount
    return () => {
      console.log('Cleaning up pose detector');
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Handle video playing state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      const minutes = Math.floor(video.currentTime / 60);
      const seconds = Math.floor(video.currentTime % 60);
      setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);

    // 업로드된 비디오 URL이 있으면 그것을 사용하고, 없으면 기본 데모 비디오 사용
    if (videoSrc) {
      video.src = videoSrc;
    } else {
      video.src = `/videos/${selectedVideo}.mp4`;
    }

    // 비디오 로드
    video.load();

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [selectedVideo, videoSrc]);

  // Animation loop for pose detection
  useEffect(() => {
    if (!detector || !isPlaying) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth || 500;
    canvas.height = video.videoHeight || 400;

    async function detectPose() {
      frameCountRef.current += 1;

      if (frameCountRef.current % frameSkip !== 0) {
        requestRef.current = requestAnimationFrame(detectPose);
        return;
      }

      try {
        const poses = await detector.estimatePoses(video);

        if (poses.length > 0) {
          const pose = poses[0];
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawSkeleton(ctx, pose.keypoints);

          // 각도 계산
          const rawAngles = calculateJointAngles(pose.keypoints);
          
          // 이동 평균 적용
          const smoothedAngles = calculateMovingAverage(rawAngles);

          // 부모 컴포넌트에 스무딩된 각도 전달
          if (onPoseUpdate) {
            onPoseUpdate(smoothedAngles);
          }
        }
      } catch (error) {
        console.error('Error during pose detection:', error);
      }

      requestRef.current = requestAnimationFrame(detectPose);
    }

    requestRef.current = requestAnimationFrame(detectPose);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [detector, isPlaying, onPoseUpdate]);

  // Function to draw the skeleton
  const drawSkeleton = (ctx: CanvasRenderingContext2D, keypoints: Keypoint[]) => {
    // Draw joints
    keypoints.forEach((keypoint) => {
      if (keypoint.score && keypoint.score > 0.3) {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);

        // Color based on body part
        if (keypoint.name.includes('left')) {
          ctx.fillStyle = colors.leftSide;
        } else if (keypoint.name.includes('right')) {
          ctx.fillStyle = colors.rightSide;
        } else {
          ctx.fillStyle = colors.torso;
        }

        ctx.fill();
      }
    });

    // Draw connections between joints
    const connections = [
      // Torso
      ['nose', 'left_shoulder'],
      ['nose', 'right_shoulder'],
      ['left_shoulder', 'right_shoulder'],
      ['left_shoulder', 'left_hip'],
      ['right_shoulder', 'right_hip'],
      ['left_hip', 'right_hip'],
      // Left arm
      ['left_shoulder', 'left_elbow'],
      ['left_elbow', 'left_wrist'],
      // Right arm
      ['right_shoulder', 'right_elbow'],
      ['right_elbow', 'right_wrist'],
      // Left leg
      ['left_hip', 'left_knee'],
      ['left_knee', 'left_ankle'],
      // Right leg
      ['right_hip', 'right_knee'],
      ['right_knee', 'right_ankle'],
    ];

    connections.forEach(([from, to]) => {
      const keypoint1 = keypoints.find((kp) => kp.name === from);
      const keypoint2 = keypoints.find((kp) => kp.name === to);

      if (
        keypoint1 &&
        keypoint2 &&
        keypoint1.score &&
        keypoint2.score &&
        keypoint1.score > 0.3 &&
        keypoint2.score > 0.3
      ) {
        ctx.beginPath();
        ctx.moveTo(keypoint1.x, keypoint1.y);
        ctx.lineTo(keypoint2.x, keypoint2.y);

        // Color based on connection type
        if (from.includes('left') || to.includes('left')) {
          ctx.strokeStyle = colors.leftSide;
        } else if (from.includes('right') || to.includes('right')) {
          ctx.strokeStyle = colors.rightSide;
        } else {
          ctx.strokeStyle = colors.torso;
        }

        ctx.lineWidth = 3;
        ctx.stroke();
      }
    });

    // Add angle measurements on the canvas
    const angles = calculateJointAngles(keypoints);

    // Draw angle text for knees
    const leftKnee = keypoints.find(kp => kp.name === 'left_knee');
    if (leftKnee && leftKnee.score && leftKnee.score > 0.3) {
      ctx.font = '16px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(`${Math.round(angles.leftKnee)}°`, leftKnee.x + 15, leftKnee.y);
    }

    const rightKnee = keypoints.find(kp => kp.name === 'right_knee');
    if (rightKnee && rightKnee.score && rightKnee.score > 0.3) {
      ctx.font = '16px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(`${Math.round(angles.rightKnee)}°`, rightKnee.x + 15, rightKnee.y);
    }

    // Draw angle text for hips
    const leftHip = keypoints.find(kp => kp.name === 'left_hip');
    if (leftHip && leftHip.score && leftHip.score > 0.3) {
      ctx.font = '16px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(`${Math.round(angles.leftHip)}°`, leftHip.x - 40, leftHip.y);
    }
  };

  // Function to calculate joint angles
  const calculateJointAngles = (keypoints: Keypoint[]) => {
    const angles = {
      leftKnee: 180,  // Default straight leg
      rightKnee: 180,
      leftHip: 180,   // Default straight alignment
      rightHip: 180,
      leftAnkle: 90,  // Default neutral position
      rightAnkle: 90
    };

    // Get keypoints
    const leftHip = keypoints.find(kp => kp.name === 'left_hip');
    const leftKnee = keypoints.find(kp => kp.name === 'left_knee');
    const leftAnkle = keypoints.find(kp => kp.name === 'left_ankle');
    const rightHip = keypoints.find(kp => kp.name === 'right_hip');
    const rightKnee = keypoints.find(kp => kp.name === 'right_knee');
    const rightAnkle = keypoints.find(kp => kp.name === 'right_ankle');
    const leftShoulder = keypoints.find(kp => kp.name === 'left_shoulder');
    const rightShoulder = keypoints.find(kp => kp.name === 'right_shoulder');

    // Calculate knee angle (between hip, knee, and ankle)
    if (leftHip && leftKnee && leftAnkle &&
        leftHip.score && leftHip.score > 0.3 &&
        leftKnee.score && leftKnee.score > 0.3 &&
        leftAnkle.score && leftAnkle.score > 0.3) {
      angles.leftKnee = calculateAngle(
        leftHip.x, leftHip.y,
        leftKnee.x, leftKnee.y,
        leftAnkle.x, leftAnkle.y
      );
    }

    if (rightHip && rightKnee && rightAnkle &&
        rightHip.score && rightHip.score > 0.3 &&
        rightKnee.score && rightKnee.score > 0.3 &&
        rightAnkle.score && rightAnkle.score > 0.3) {
      angles.rightKnee = calculateAngle(
        rightHip.x, rightHip.y,
        rightKnee.x, rightKnee.y,
        rightAnkle.x, rightAnkle.y
      );
    }

    // Calculate hip angle (between shoulder, hip, and knee)
    if (leftShoulder && leftHip && leftKnee &&
        leftShoulder.score && leftShoulder.score > 0.3 &&
        leftHip.score && leftHip.score > 0.3 &&
        leftKnee.score && leftKnee.score > 0.3) {
      angles.leftHip = calculateAngle(
        leftShoulder.x, leftShoulder.y,
        leftHip.x, leftHip.y,
        leftKnee.x, leftKnee.y
      );
    }

    if (rightShoulder && rightHip && rightKnee &&
        rightShoulder.score && rightShoulder.score > 0.3 &&
        rightHip.score && rightHip.score > 0.3 &&
        rightKnee.score && rightKnee.score > 0.3) {
      angles.rightHip = calculateAngle(
        rightShoulder.x, rightShoulder.y,
        rightHip.x, rightHip.y,
        rightKnee.x, rightKnee.y
      );
    }

    // Calculate ankle angle (pronation/supination)
    if (leftKnee && leftAnkle &&
        leftKnee.score && leftKnee.score > 0.3 &&
        leftAnkle.score && leftAnkle.score > 0.3) {
      // For demonstration purposes, using a simplified calculation
      // Real pronation/supination would require more complex 3D modeling
      const ankleOffset = leftKnee.x - leftAnkle.x;
      angles.leftAnkle = 90 + (ankleOffset / 2);  // Rough approximation
    }

    if (rightKnee && rightAnkle &&
        rightKnee.score && rightKnee.score > 0.3 &&
        rightAnkle.score && rightAnkle.score > 0.3) {
      const ankleOffset = rightKnee.x - rightAnkle.x;
      angles.rightAnkle = 90 - (ankleOffset / 2);  // Rough approximation
    }

    return angles;
  };

  // Calculate angle between three points
  const calculateAngle = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => {
    // Calculate vectors
    const v1 = { x: x1 - x2, y: y1 - y2 };
    const v2 = { x: x3 - x2, y: y3 - y2 };

    // Calculate dot product
    const dotProduct = v1.x * v2.x + v1.y * v2.y;

    // Calculate magnitudes
    const v1Magnitude = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const v2Magnitude = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

    // Calculate angle in radians
    const angleRadians = Math.acos(dotProduct / (v1Magnitude * v2Magnitude));

    // Convert to degrees
    const angleDegrees = angleRadians * (180 / Math.PI);

    return angleDegrees;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVideo(event.target.value);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
          <div className="text-white">포즈 추적 모델을 불러오는 중...</div>
        </div>
      )}

      <div className="relative h-64">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={posterSrc}
          crossOrigin="anonymous"
          playsInline
          src={videoSrc}
          loop
          muted
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ pointerEvents: 'none' }}
        />

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
          <div className="text-white text-xs">
            <span>추적 활성화</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col items-center justify-center">
        <div className="flex items-center mb-4">
          <select 
            className="bg-gray-100 text-gray-900 px-3 py-1 rounded-lg text-sm mr-2 hover:bg-gray-200 transition-colors"
            onChange={handleVideoChange}
            value={selectedVideo}
          >
            <option value="tennis">테니스 데모</option>
            <option value="baseball">야구 데모</option>
            <option value="yoga">요가 데모</option>
            <option value="running_demo">러닝 데모</option>
          </select>
          <button 
            className="bg-[rgb(223,255,50)] text-gray-900 px-4 py-1 rounded-lg text-sm font-medium hover:bg-[rgb(203,235,30)] transition-colors"
            onClick={handlePlayPause}
          >
            {isPlaying ? '일시정지' : '데모 재생'}
          </button>
        </div>

        <div className="w-full bg-gray-50 rounded-xl p-4 text-sm">
          <p className="mb-1">
            <span className="text-gray-900 font-medium">AI 포즈 추정:</span> 실시간 관절 추적 활성화
          </p>
          <p className="text-xs text-gray-600">
            TensorFlow.js MoveNet 모델이 {isPlaying ? '동작 중인' : '정지된'} 프레임을 분석 중입니다.
            각도가 스켈레톤에 직접 표시됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoseTracker;
