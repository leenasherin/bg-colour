import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [bgColor, setBgColor] = useState('#ffffff'); // Initial background color
  const [isAutoChange, setIsAutoChange] = useState(false); // Flag to toggle auto color change
  const [timer, setTimer] = useState(null); // Store timer reference

  // Predefined colors for auto-change mode
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFFF33', '#FF33FF'];

  // Function to change the background color
  const changeBackgroundColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  };

  // Start auto color change every 3 seconds
  const startAutoChange = () => {
    setIsAutoChange(true);
    const autoTimer = setInterval(changeBackgroundColor, 3000);
    setTimer(autoTimer);
  };

  // Stop auto color change
  const stopAutoChange = () => {
    setIsAutoChange(false);
    clearInterval(timer);
    setTimer(null);
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  // Handle custom color change from color picker
  const handleColorChange = (event) => {
    setBgColor(event.target.value);
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className="content">
        <h1 className="header">Background Color Changer</h1>
        <button
          onClick={isAutoChange ? stopAutoChange : startAutoChange}
          className={`toggle-button ${isAutoChange ? 'stop' : 'start'}`}
        >
          {isAutoChange ? 'Stop Auto Change' : 'Start Auto Change'}
        </button>
        <div className="color-picker">
          <input
            type="color"
            value={bgColor}
            onChange={handleColorChange}
            className="color-input"
          />
          <span className="color-label">Choose a custom color</span>
        </div>
      </div>
    </div>
  );
}

export default App;
