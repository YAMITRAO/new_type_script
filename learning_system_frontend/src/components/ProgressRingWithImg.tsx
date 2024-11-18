import React from "react";

interface CircularProgressRingProps {
  size: number; // The diameter of the circle
  strokeWidth: number; // The thickness of the border
  percentage: number; // The percentage to fill
  color: string; // The color of the progress fill
  imgUrl: string;
}

const ProgressRighWithImg: React.FC<CircularProgressRingProps> = ({
  size,
  strokeWidth,
  percentage,
  color,
  imgUrl,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate the stroke-dasharray and stroke-dashoffset based on the percentage
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative text-white rounded-full w-fit h-fit "
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="absolute top-0 left-0">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          // stroke="#f5f1f1"
          stroke="#1f1f1f"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color} // The color of the progress fill
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // Rotate to start the progress at the top
        />
      </svg>

      <div
        style={{ width: size, height: size, padding: strokeWidth + 2 }}
        className=" rounded-full  text-white box-border  flex justify-center items-center"
      >
        <img
          className="rounded-full  "
          width={size}
          height={size}
          src={imgUrl}
        />
      </div>
    </div>
  );
};

export default ProgressRighWithImg;
