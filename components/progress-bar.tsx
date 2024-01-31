import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const width = Math.min(100, (current / total) * 100);

  return (
    <div className="w-full bg-[#393E44] rounded-full">
      <div
        className="bg-[#01F7FF] text-xs font-medium text-blue-100 text-center p-[1px] leading-none rounded-l-full"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;