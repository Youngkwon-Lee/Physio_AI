'use client';

interface MeasurementGaugeProps {
  value: number;
  min: number;
  max: number;
  type?: 'positive' | 'negative' | 'neutral';
  unit?: string;
  warningLabel?: string;
}

const MeasurementGauge = ({
  value,
  min,
  max,
  type = 'neutral',
  unit = '',
  warningLabel
}: MeasurementGaugeProps) => {
  // Calculate the position of the value marker (0-100%)
  const valuePosition = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative">
      <div className="text-xs text-gray-500 mb-1">{warningLabel}</div>
      <div className="relative h-2 bg-gray-100 rounded-full">
        <div
          className="absolute top-1/2 -translate-y-1/2 h-full"
          style={{ left: `${valuePosition}%` }}
        >
          <div className={`h-8 w-2 ${
            type === 'positive'
              ? 'bg-[rgb(223,255,50)]'
              : type === 'negative'
                ? 'bg-red-100'
                : 'bg-yellow-100'
          } absolute -translate-x-1/2`}></div>
          <div className={`h-4 w-4 ${
            type === 'positive'
              ? 'bg-[rgb(223,255,50)]'
              : type === 'negative'
                ? 'bg-red-100'
                : 'bg-yellow-100'
          } rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-1/2`}></div>
          <div className={`text-xs absolute top-full mt-6 -translate-x-1/2 ${
            type === 'positive'
              ? 'text-gray-900'
              : type === 'negative'
                ? 'text-red-600'
                : 'text-yellow-600'
          }`}>{value}{unit}</div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementGauge;
