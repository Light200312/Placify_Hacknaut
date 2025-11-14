import React from 'react';

/**
 * Donut chart component for displaying scores
 */
const DonutChart = ({ percentage }) => {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    let strokeColorClass = 'text-green-500';
    if (percentage < 40) {
        strokeColorClass = 'text-red-500';
    } else if (percentage < 70) {
        strokeColorClass = 'text-yellow-500';
    }

    return (
        <div className="relative w-36 h-36">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle
                    className="text-gray-200"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <circle
                    className={`progress-ring__circle ${strokeColorClass}`}
                    strokeWidth="12"
                    strokeDasharray={`${circumference} ${circumference}`}
                    style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 0.35s', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
            </svg>
            <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold ${strokeColorClass}`}>
                {percentage}<span className="text-lg">%</span>
            </span>
        </div>
    );
};

export default DonutChart;