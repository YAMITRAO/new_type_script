import React from "react";

interface CircularImageWithProgressProps {
  imageUrl: string;
  percentage: number;
  size: number; // The size of the circle (diameter)
  strokeWidth: number; // The thickness of the circular border
  progressColor: string; // The color to fill the progress ring
}

const Test: React.FC<CircularImageWithProgressProps> = ({
  imageUrl,
  percentage,
  size,
  strokeWidth,
  progressColor,
}) => {
  const radius = (size - strokeWidth) / 2; // The radius of the progress ring
  const circumference = 2 * Math.PI * radius; // The circumference of the circle

  // Calculate the strokeDashoffset based on the percentage
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      {/* Background Circle (White portion) */}
      <svg
        width={size}
        height={size}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "rotate(-90deg)", // To start from the top
        }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#fff" // White color for the remaining part of the circle
          strokeWidth={strokeWidth}
          fill="none"
        />
      </svg>

      {/* Progress Ring (Colored portion) */}
      <svg
        width={size}
        height={size}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "rotate(-90deg)", // To start from the top
        }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor} // Color of the progress fill
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      {/* Image (Centered inside the circle) */}
      <div
        style={{
          width: size,
          height: size,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default Test;
