# CardSync

## Thought Process and Setup

### 1. [Client](client/README.md)

### 2. [Server](server/Readme.md)

### 3. Deployment

#### Thought Process for Building Docker Deployment

- ##### Choosing Docker for Deployment
Docker containers ensure that the application runs the same way on any machine. This consistency is crucial for reliable deployment and scaling.

- #### Setting Up Docker for Backend
I started by creating a Dockerfile for the backend, specifying the base image and necessary dependencies. The Dockerfile includes steps to install Python, FastAPI, and other dependencies, and to copy the application code into the container environment.

- #### Configuring Docker Compose
To manage multiple services, I set up docker-compose.yml. This file defines the services for the database and backend, specifying how they should be built and connected. Docker compose also allows for environment variables and volumes to be managed centrally.

- #### Database Integration and Networking
The docker-compose.yml file includes a PostgreSQL service, which is configured to store its data. The networking capabilities of Docker Compose ensure that the backend can seamlessly connect to the database service.

## Hypothetical API

#### API Endpoints
1. Get All Cards
- Endpoint: GET /api/cards
- Description: Retrieve a list of all cards.
- Response:
```json
[
  { "id": 1, "type": "bank-draft", "title": "Bank Draft", "position": 0 },
  { "id": 2, "type": "bill-of-lading", "title": "Bill of Lading", "position": 1 }
]
```

2. Get a Single Card
- Endpoint: GET /api/cards/{id}
- Description: Retrieve a specific card by its ID.
- Response:
```json
{ "id": 1, "type": "bank-draft", "title": "Bank Draft", "position": 0 }
```

3. Create a New Card
- Endpoint: POST /api/cards
- Description: Add a new card.
- Request Body:
```json
{ "type": "invoice", "title": "Invoice", "position": 2 }
```

4. Update an Existing Card

- Endpoint: PUT /api/cards/{id}
- Description: Update a specific card by its ID.
- Request Body:
```json
{ "type": "invoice", "title": "Updated Invoice", "position": 2 }
```

5. Delete a Card
- Endpoint: DELETE /api/cards/{id}
- Description: Remove a specific card by its ID.
- Response:
```json
{ "message": "Card deleted successfully" }
```

### Considerations for Long-Term Maintenance

- Versioning: Use versioning in the API (e.g., /api/v1/cards) to manage changes over time.
- Documentation: Use tools like Swagger (integrated in FastAPI) to maintain API documentation.
- Testing: Implement comprehensive tests for all endpoints and UI components.
- Error Handling: Ensure consistent and informative error responses.
