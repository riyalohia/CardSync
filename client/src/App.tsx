import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { CardType } from './types';
import { fetchAPI } from './util/fetch';
import CardContainer from './components/CardContainer';
import Overlay from './components/Overlay';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [lastSaveTime, setLastSaveTime] = useState<number | null>(Date.now());
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const hasChanges = useRef<boolean>(false);

  // Fetch cards on component mount
  useEffect(() => {
    setTimeout(() => {
      fetchAPI('/cards')
        .then(response => response.json())
        .then(data => {
          const cardsData = [...data]
          setCards(data);
          setLoading(false);
        });
    }, 1000);
  }, []);

  // Save reordered images in every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (hasChanges.current) {
        saveCards();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [cards]);

  useEffect(() => {
    if (hasChanges.current) {
      setSaving(true);
    }
  }, [hasChanges.current])

  useEffect(() => {
    if (overlayImage) {
      window.addEventListener('keydown', handleOverlayClose);
    } else {
      window.removeEventListener('keydown', handleOverlayClose);
    }

    return () => {
      window.removeEventListener('keydown', handleOverlayClose);
    };
  }, [overlayImage]);

  // Save the new position of image
  const saveCards = async () => {
    try {
      await fetchAPI('/cards/reorder', {
        method: 'PATCH',
        // headers: { 'Content-Type': 'application/json',  },
        body: JSON.stringify(cards.map((card, index) => ({
          id: card.id,
          position: index
        })))
      });
      setLastSaveTime(Date.now());
      hasChanges.current = false;
    } catch (error) {
      console.error('Error saving cards:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCardClick = (image: string) => {
    setOverlayImage(image);
  };

  const handleOverlayClose = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOverlayImage(null);
    }
  };

  const timeSinceLastSave = lastSaveTime ? Math.floor((Date.now() - lastSaveTime) / 1000) : 0;

  if (loading) {
    return <Spinner message='Loading...' />;
  }

  return (
    <div className="App">
      <div className='card-saved-info'>
        <div className="last-save">Last saved {timeSinceLastSave} seconds ago</div>
        {saving && <Spinner message='Saving...' />}
      </div>
      <CardContainer
        cards={cards}
        setCards={setCards}
        hasChanges={hasChanges}
        onCardClick={handleCardClick}
      />
      {overlayImage && (
        <Overlay imageUrl={overlayImage} onClose={() => setOverlayImage(null)} />
      )}
    </div>
  );
};

export default App;
