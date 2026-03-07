import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    onClick,
    hoverable = true
}) => {
    return (
        <div
            onClick={onClick}
            className={`
        bg-white rounded-2xl border border-slate-100 overflow-hidden
        ${hoverable ? 'hover:shadow-custom hover:-translate-y-1 transition-all duration-300' : 'shadow-sm'}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default Card;
