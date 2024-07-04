# Card Sync Server

## Setup

To run the backend:

1. Navigate to server
  ```bash
  cd server
  ```
2. Make sure you have docker installed in your system. Also, create a postgres user and password.

3. Create a .env file
  ```bash
  DATABASE_USER = '' 
  DATABASE_PASSWORD = ''
  ```
4. Run the server
```bash
docker-compose up --build
```

5. If you encounter an error that port 5432 is already in use, run:
```bash
sudo lsof -i :5432
```
This will give the `pid`, now run:
```bash
sudo kill -9 <pid>
```
This will kill the process running on port. Now again try running:
```bash
docker-compose up --build
```

## Thought Process

#### Initial Setup and Framework Selection
To build the server, I chose FastAPI due to its simplicity, and automatic generation of interactive API documentation. I started by setting up a new FastAPI project, ensuring that the structure was clean and modular. The goal was to create a scalable backend that could handle the necessary CRUD operations for managing card data efficiently.

#### Database Integration and ORM Configuration
For database management, I opted for PostgreSQL and SQLAlchemy. I configured the database connection in database.py and set up SQLAlchemy models in models.py to represent the card data structure. This setup ensures that the database interactions are smooth and that the data models are easy to work with.

#### CRUD Operations and API Endpoints
I implemented the CRUD operations in crud.py to handle fetching and updating card data. For the API endpoints in main.py, I used FastAPI's dependency injection to manage database sessions and ensure clean separation of concerns.

#### Adding Reorder Functionality
To handle the reordering of cards, I added a new endpoint /cards/reorder. This endpoint accepts a list of card positions and updates the database accordingly. The logic was added to the crud.py file to process the reordering efficiently.
