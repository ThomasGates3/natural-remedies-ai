import React from 'react';

export const TurmericIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g fill="currentColor">
            <ellipse cx="50" cy="50" rx="25" ry="15" transform="rotate(-30 50 50)" />
            <ellipse cx="60" cy="65" rx="15" ry="8" transform="rotate(-30 60 65)" />
            <ellipse cx="35" cy="40" rx="12" ry="7" transform="rotate(-30 35 40)" />
            <ellipse cx="45" cy="30" rx="8" ry="5" transform="rotate(-30 45 30)" />
        </g>
    </svg>
);

export const GingerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g fill="currentColor">
            <path d="M34,42 Q25,35 30,25 Q35,15 45,20 Q55,25 50,35 L40,45 Q35,55 25,58 Q15,60 18,50 Z" />
            <path d="M50,35 Q60,30 70,35 Q80,40 75,50 Q70,60 60,55 L50,50 Q45,65 55,70 Q65,75 70,65" />
            <path d="M40,45 Q45,50 40,60 Q35,70 30,65 Q25,60 30,50 Z" />
        </g>
    </svg>
);

export const EucalyptusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M50 90 V 10" />
            <ellipse cx="60" cy="20" rx="8" ry="15" transform="rotate(20 60 20)" />
            <ellipse cx="40" cy="35" rx="8" ry="15" transform="rotate(-20 40 35)" />
            <ellipse cx="60" cy="50" rx="8" ry="15" transform="rotate(20 60 50)" />
            <ellipse cx="40" cy="65" rx="8" ry="15" transform="rotate(-20 40 65)" />
        </g>
    </svg>
);

export const ChamomileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g fill="currentColor">
            <circle cx="50" cy="50" r="15" className="text-yellow-500" />
            <ellipse cx="50" cy="25" rx="10" ry="18" />
            <ellipse cx="50" cy="75" rx="10" ry="18" />
            <ellipse cx="25" cy="50" rx="18" ry="10" />
            <ellipse cx="75" cy="50" rx="18" ry="10" />
            <ellipse cx="32" cy="32" rx="16" ry="10" transform="rotate(-45 32 32)" />
            <ellipse cx="68" cy="68" rx="16" ry="10" transform="rotate(-45 68 68)" />
            <ellipse cx="32" cy="68" rx="10" ry="16" transform="rotate(45 32 68)" />
            <ellipse cx="68" cy="32" rx="10" ry="16" transform="rotate(45 68 32)" />
        </g>
    </svg>
);