from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db
from schemas import Card, CardReorder
from crud import get_cards, update_card_positions
import models
from create_db import insert_data

models.create_table()
insert_data()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/cards", response_model=list[Card])
def read_cards(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
  cards = get_cards(db, skip=skip, limit=limit)
  return cards

@app.patch("/cards/reorder", response_model=list[Card])
def reorder_cards(card_positions: list[CardReorder], db: Session = Depends(get_db)):
  return update_card_positions(db=db, card_positions=card_positions)
