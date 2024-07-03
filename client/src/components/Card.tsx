import React from 'react';
import { CardType } from '../types';

interface CardProps {
  data: CardType;
  index: number;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ data, index, onDragStart, onDragEnter, onDragEnd, onClick }) => {
  return (
    <div
      className="card"
      draggable
      onDragStart={() => onDragStart(index)}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <img
        src={`assets/${data.type}.jpg`}
        alt={data.title}
        height="200px"
        className='card-image'
      />
      <p className='card-text'>{data.title}</p>
    </div>
  );
};

export default Card;
