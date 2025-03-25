import { CheckCircle } from 'lucide-react';

const VideoCriteria = () => {
  const criteria = [
    'The camera is stable, not following the athlete',
    'The person is back view and visible from head to toe',
    'There is only one person on the video',
    'The person is on a treadmill',
    'Video in portrait, no slow motion'
  ];

  return (
    <div className="bg-muted p-6 rounded-lg">
      <h3 className="text-lg font-medium mb-4">
        For optimal analysis, please confirm that your video meets these criteria:
      </h3>
      <ul className="space-y-4">
        {criteria.map((criterion, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-3 ochy-green flex-shrink-0" />
            <span>The {criterion}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-full flex items-center">
          <span>My video is good</span>
          <span className="ml-1">👍</span>
        </button>
      </div>
    </div>
  );
};

export default VideoCriteria;
