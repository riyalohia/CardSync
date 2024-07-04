# Card Sync Client

## Setup

To run the frontend:

1. Navigate to client
  ```bash
  cd client
  ```
2. Create a .env file
  ```bash
  BACKEND_URL = 'http://127.0.0.1:8000' // This points to the server
  ```
3. Install dependencies and run the server
```bash
npm install
npm run start
```

## Thought process

#### Initial Setup and Component Structure
I started by setting up a basic React application using Create React App. The component structure was designed to be modular, with separate components for the main application logic (App.tsx) and individual card elements (Card.tsx). This approach ensures maintainability and scalability.

#### State Management and Drag-and-Drop Logic
State management was handled using React's useState hook for managing card states, loading, saving state, and the last save time. I implemented drag-and-drop manually to keep the app lightweight and customized. The drag-and-drop handlers were implemented to handle reordering and state updates efficiently.

#### Periodic Saving and User Feedback
I implemented an auto-save feature that saves changes every five seconds if modifications are detected, using the useEffect hook. A ref (hasChanges) tracks changes to prevent unnecessary API calls. A loading spinner indicates when data is being saved, and the time since the last save is displayed for user feedback.

#### TypeScript Integration for Robustness
Integrating TypeScript improved code robustness and maintainability. This provides better documentation and makes the code easier to understand and maintain.
