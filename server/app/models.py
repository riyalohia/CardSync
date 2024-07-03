from sqlalchemy import Column, Integer, String

from database import Base, engine

def create_table():
  Base.metadata.create_all(engine)
  

class Card(Base):
  __tablename__ = "cards"
  id = Column(Integer, primary_key=True, index=True)
  type = Column(String, index=True)
  title = Column(String)
  position = Column(Integer)
