import React from 'react';

const ColorBlock = ({ color }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-200 hover:scale-105"
      style={{ backgroundColor: color }}
      onClick={handleCopy}
    >
      <span className="text-white font-bold">{color}</span>
    </div>
  );
};

export default ColorBlock;
