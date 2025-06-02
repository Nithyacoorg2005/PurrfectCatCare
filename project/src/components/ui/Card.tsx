import React from 'react';

interface CardProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {(title || icon) && (
        <div className="px-6 py-4 border-b border-gray-100 flex items-center">
          {icon && <div className="mr-3 text-purple-500">{icon}</div>}
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;