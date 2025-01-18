import React from "react";

type Props = {
  rating: number;
  maxStars?: number;
  size?: number;
  className?: string;
};

export const StarRating = ({
  rating,
  maxStars = 5,
  size = 24,
  className = "",
}: Props) => {
  // Ensure rating is between 0 and maxStars
  const safeRating = Math.min(Math.max(0, rating), maxStars);

  return (
    <div className={`flex ${className}`}>
      {[...Array(maxStars)].map((_, index) => {
        const fillPercent = Math.min(Math.max(safeRating - index, 0), 1) * 100;

        return (
          <div key={index} style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              {/* Background star (gray) */}
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="#E2E8F0" // Tailwind gray-200
              />

              {/* Filled star (yellow) with clip path for partial fill */}
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="#FCD34D" // Tailwind yellow-300
                style={{
                  clipPath: `inset(0 ${100 - fillPercent}% 0 0)`,
                }}
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};
