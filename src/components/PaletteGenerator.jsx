import React, { useState, useEffect } from 'react';
import ColorBlock from './ColorBlock';
import tinycolor from 'tinycolor2';

const COMMON_COLORS = [
  { name: 'Red', value: '#FF0000' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Green', value: '#008000' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Purple', value: '#800080' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Pink', value: '#FFC0CB' },
  { name: 'Brown', value: '#A52A2A' },
  { name: 'Gray', value: '#808080' },
  { name: 'Black', value: '#000000' }
];

const PaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState('#3498db'); // Default base color
  const [palette, setPalette] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Function to generate shades and tints of the base color
  const generatePalette = (base) => {
    setIsGenerating(true);
    const shades = [];

    // Generate 2 darker shades and 2 lighter tints, plus the base color
    const color = tinycolor(base);
    shades.push(color.darken(40).toString()); // Darkest
    shades.push(color.darken(20).toString()); // Darker
    shades.push(base); // Base color
    shades.push(color.lighten(20).toString()); // Lighter
    shades.push(color.lighten(40).toString()); // Lightest

    setPalette(shades);
    setTimeout(() => setIsGenerating(false), 300); // Animation duration
  };

  // Generate palette when base color changes
  useEffect(() => {
    generatePalette(baseColor);
  }, [baseColor]);

  const handleInputChange = (e) => {
    const color = e.target.value;
    setBaseColor(color);
  };

  const handleColorSelect = (colorValue) => {
    setBaseColor(colorValue);
    setShowColorPicker(false);
  };

  const handleRegenerateClick = () => {
    generatePalette(baseColor);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 min-h-screen">
      <div className="w-full max-w-4xl p-8 border-2 border-gray-700 rounded-xl bg-gray-800 shadow-xl">
        <h1 className="text-3xl font-bold mb-6 animate-fadeIn text-white text-center">Dynamic Color Palette Generator</h1>
        <h1 className="text-2xl font-semibold mb-4 text-gray-200 animate-slideDown text-center">Select Base Color</h1>
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-4 items-center">
              <input
                type="color"
                value={baseColor}
                onChange={handleInputChange}
                className="w-20 h-12 cursor-pointer transform hover:scale-110 transition-transform duration-200 bg-transparent"
              />
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Choose from Names
              </button>
            </div>
            {showColorPicker && (
              <div className="grid grid-cols-2 gap-2 mt-4 p-4 bg-gray-700 rounded-lg max-h-60 overflow-y-auto">
                {COMMON_COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorSelect(color.value)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-600 rounded hover:bg-gray-500 transition-colors"
                  >
                    <div 
                      className="w-6 h-6 rounded-full border border-gray-400"
                      style={{ backgroundColor: color.value }}
                    ></div>
                    <span className="text-white">{color.name}</span>
                  </button>
                ))}
              </div>
            )}
            <div className="text-white text-center">
              <div>{baseColor}</div>
              <div>{tinycolor(baseColor).toName() || 'Custom Color'}</div>
            </div>
          </div>
          <button
            onClick={handleRegenerateClick}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200"
          >
            Regenerate Palette
          </button>
        </div>
        <h1 className="text-2xl font-semibold mb-4 text-gray-200 animate-slideDown text-center">Shades & Tints</h1>
        <div 
          className={`grid grid-cols-5 gap-4 transition-opacity duration-300 ${
            isGenerating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {palette.map((color, index) => (
            <div
              key={index}
              className="transform transition-all duration-300"
              style={{
                animation: `fadeSlideIn 0.5s ${index * 0.1}s both`,
              }}
            >
              <ColorBlock color={color} />
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in;
          }
          .animate-slideDown {
            animation: slideDown 0.5s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default PaletteGenerator;
