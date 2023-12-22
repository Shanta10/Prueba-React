import React, { useState, useEffect } from 'react';
import './App.css';

interface Sign {
  name: string;
}

interface Predictions {
  [key: string]: string;
}

const ZodiacSigns: React.FC = () => {
  const [zodiacSigns, setZodiacSigns] = useState<Sign[]>([]);
  const [predictions, setPredictions] = useState<Predictions>({});
  const [selectedSign, setSelectedSign] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setZodiacSigns(data.signs);
        setPredictions(data.predictions);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSignClick = (signName: string) => {
    setSelectedSign(signName);
  };

  return (
    <div className="zodiac-container">
      <div className="zodiac-grid">
        {zodiacSigns.map((sign, index) => (
          <div key={index} className="zodiac-card" onClick={() => handleSignClick(sign.name)}>
            <h2>{sign.name}</h2>
            <p>{predictions[sign.name]}</p>
          </div>
        ))}
      </div>
      <div className="prediction-box">
        {selectedSign && (
          <div className="prediction">
            <h2>Virgo</h2>
            <p>{predictions[selectedSign]}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZodiacSigns;
