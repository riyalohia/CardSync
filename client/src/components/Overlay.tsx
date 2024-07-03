import React from 'react';

interface OverlayProps {
  imageUrl: string;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="overlay" onClick={onClose}>
      <img src={imageUrl} alt="Overlay" className="overlay-image" />
    </div>
  );
};

export default Overlay;
