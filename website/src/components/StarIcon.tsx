import React from 'react';

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2L15 12L12 22L9 12L12 2Z" />
    <path d="M2 12L12 15L22 12L12 9L2 12Z" />
  </svg>
);

export default StarIcon;