import models
import psycopg2
from psycopg2 import sql
import os

DATABASE_USER = os.environ.get("DATABASE_USER")
DATABASE_PASSWORD = os.environ.get("DATABASE_PASSWORD")

def insert_data():
  db_params = {
    'dbname': 'Card',
    'user': DATABASE_USER,
    'password': DATABASE_PASSWORD,
    'host': 'db',
    'port': '5432'
  }

  data = [
      (1, 'bank-draft', 'Blank Draft', 0),
      (2, 'bill-of-lading', 'Bill of Lading', 1),
      (3, 'bank-draft-2', 'Invoice', 2),
      (4, 'invoice', 'Blank Draft 2', 3),
      (5, 'bill-of-lading-2', 'Bill of Lading 2', 4),
  ]

  # SQL query to insert data
  insert_query = """
  INSERT INTO cards (id, type, title, position)
  VALUES %s
  """

  try:
      # Establish connection to the database
      conn = psycopg2.connect(**db_params)
      cursor = conn.cursor()

      # Execute the insert query with the data
      psycopg2.extras.execute_values(
          cursor, insert_query, data
      )
      # Commit the transaction
      conn.commit()

      print("Data inserted successfully")

  except Exception as error:
      print(f"Error: {error}")
      conn.rollback()

  finally:
      # Close the cursor and connection
      cursor.close()
      conn.close()