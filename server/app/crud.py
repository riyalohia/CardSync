from sqlalchemy.orm import Session
from models import Card
from schemas import CardReorder

def get_cards(db: Session, skip: int = 0, limit: int = 100):
  return db.query(Card).order_by(Card.position).offset(skip).limit(limit).all()

def update_card_positions(db: Session, card_positions: list[CardReorder]):
  for card_position in card_positions:
    db_card = db.query(Card).filter(Card.id == card_position.id).first()
    if db_card:
      db_card.position = card_position.position
    db.commit()
  return db.query(Card).all()
