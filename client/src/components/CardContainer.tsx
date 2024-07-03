import React from 'react';
import Card from './Card';
import { CardType } from '../types';

interface CardContainerProps {
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  hasChanges: React.MutableRefObject<boolean>;
  onCardClick: (imageUrl: string) => void;
}

const CardContainer: React.FC<CardContainerProps> = ({ cards, setCards, hasChanges, onCardClick }) => {
  const [draggingIndex, setDraggingIndex] = React.useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragEnter = (index: number) => {
    const newCards = [...cards];
    const draggingItem = newCards[draggingIndex!];
    newCards.splice(draggingIndex!, 1);
    newCards.splice(index, 0, draggingItem);
    setDraggingIndex(index);
    setCards(newCards);
    hasChanges.current = true;
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  return (
    <div className="card-container">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          data={card}
          index={index}
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragEnd={handleDragEnd}
          onClick={() => onCardClick(`assets/${card.type}.jpg`)}
        />
      ))}
    </div>
  );
};

export default CardContainer;
