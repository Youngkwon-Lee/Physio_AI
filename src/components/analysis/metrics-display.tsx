'use client';

interface RunningMetric {
  value: string | number;
  unit: string;
  label: string;
  icon?: React.ReactNode;
  visualComponent?: React.ReactNode;
}

interface MetricsDisplayProps {
  metrics: RunningMetric[];
  columns?: number;
}

const MetricsDisplay = ({ metrics, columns = 3 }: MetricsDisplayProps) => {
  const getColSpan = () => {
    switch (columns) {
      case 1: return 'w-full';
      case 2: return 'w-1/2';
      case 3: return 'w-1/3';
      case 4: return 'w-1/4';
      default: return 'w-1/3';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`bg-white rounded-xl p-6 flex flex-col items-center shadow-md ${getColSpan()}`}
        >
          <div className="text-4xl font-bold mb-1 text-gray-900">{metric.value}</div>
          <div className="text-gray-500 text-sm">{metric.unit}</div>
          <div className="mt-2 text-center text-gray-700">{metric.label}</div>
          {metric.visualComponent && (
            <div className="mt-4 w-full">
              {metric.visualComponent}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MetricsDisplay;
