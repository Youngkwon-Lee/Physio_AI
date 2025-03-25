'use client';

import { useState } from 'react';

interface JointAnglesProps {
  title?: string;
}

const JointAngles = ({ title = "Joint Angles" }: JointAnglesProps) => {
  const [selectedJoints, setSelectedJoints] = useState({
    leftKnee: true,
    rightKnee: true,
    leftHip: false,
    rightHip: false,
    leftElbow: false,
    rightElbow: false
  });

  const toggleJoint = (joint: keyof typeof selectedJoints) => {
    setSelectedJoints(prev => ({
      ...prev,
      [joint]: !prev[joint]
    }));
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl mb-4">{title}</h2>

      <div className="flex mt-8">
        <div className="w-1/3">
          <p className="text-lg mb-4">Joint Angles</p>
        </div>
        <div className="w-1/3 text-center">
          <p className="text-lg mb-4">Left</p>
        </div>
        <div className="w-1/3 text-center">
          <p className="text-lg mb-4">Right</p>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-1/3">
          <p>Knee</p>
        </div>
        <div className="w-1/3 flex justify-center">
          <button
            className={`w-8 h-8 rounded-full ${
              selectedJoints.leftKnee ? 'bg-red-500' : 'bg-gray-700'
            }`}
            onClick={() => toggleJoint('leftKnee')}
          />
        </div>
        <div className="w-1/3 flex justify-center">
          <button
            className={`w-8 h-8 rounded-full ${
              selectedJoints.rightKnee ? 'bg-red-500' : 'bg-gray-700'
            }`}
            onClick={() => toggleJoint('rightKnee')}
          />
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-1/3">
          <p>Hip</p>
        </div>
        <div className="w-1/3 flex justify-center">
          <button
            className={`w-8 h-8 rounded-full ${
              selectedJoints.leftHip ? 'bg-white' : 'bg-gray-700'
            }`}
            onClick={() => toggleJoint('leftHip')}
          />
        </div>
        <div className="w-1/3 flex justify-center">
          <button
            className={`w-8 h-8 rounded-full ${
              selectedJoints.rightHip ? 'bg-white' : 'bg-gray-700'
            }`}
            onClick={() => toggleJoint('rightHip')}
          />
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-1/3">
          <p>Elbow</p>
        </div>
        <div className="w-1/3 flex justify-center">
          <button
            className={`w-8 h-8 rounded-full ${
              selectedJoints.leftElbow ? 'bg-white' : 'bg-gray-700'
            }`}
            onClick={() => toggleJoint('leftElbow')}
          />
        </div>
        <div className="w-1/3 flex justify-center">
          <button
            className={`w-8 h-8 rounded-full ${
              selectedJoints.rightElbow ? 'bg-white' : 'bg-gray-700'
            }`}
            onClick={() => toggleJoint('rightElbow')}
          />
        </div>
      </div>
    </div>
  );
};

export default JointAngles;
