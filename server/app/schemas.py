from pydantic import BaseModel

class CardBase(BaseModel):
  type: str
  title: str
  position: int

class CardCreate(CardBase):
  pass

class Card(CardBase):
  id: int
  class Config:
    orm_mode = True

class CardReorder(BaseModel):
  id: int
  position: int
