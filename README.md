# Distributed LLM System Assignment

This project consists of a Python backend for running LLM models (Llama2 and Mistral) and a Node.js API server for handling queries and storing conversation history.

## Prerequisites

- Docker
- Docker Compose

## Setup and Running

1. Clone this repository
2. Navigate to the project directory
3. Run the following command to start the entire system:

    `docker-compose up --build`

4. The API server will be available at `http://localhost:3000`
5. The frontend interface will be available at `http://localhost:8080`

## Using the Frontend: Optional

1. Open a web browser and navigate to `http://localhost:8080`
2. You'll see a simple interface where you can:
   - Select the LLM model (Llama2 or Mistral)
   - Enter a question
   - Provide a conversation ID
   - Send queries to the LLM
   - View the LLM's response
   - Load and view the conversation history

## API Endpoints

- POST `/query`: Send a query to the LLM
- Body: `{ "model": "llama2" | "mistral", "question": "Your question", "conversationId": "unique_id" }`
- GET `/conversations`: List all conversations
- GET `/conversations/:id`: Get details of a specific conversation

### Example Request

```json
{
  "model": "llama2",
  "question": "What is the capital of France?",
  "conversationId": "conv1"
}
