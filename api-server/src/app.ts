import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

app.post('/query', async (req, res) => {
  try {
    let { model, question, conversationId } = req.body;

    // Generate a conversation ID if not provided
    if (!conversationId) {
      conversationId = uuidv4();
    }

    const response = await axios.post('http://llm-backend:8000/query', {
      model,
      question,
      conversation_id: conversationId,
    });

    await pool.query(
      'INSERT INTO conversations (id, model, question, response) VALUES ($1, $2, $3, $4)',
      [conversationId, model, question, response.data.response]
    );

    res.json({ ...response.data, conversationId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/conversations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM conversations ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/conversations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM conversations WHERE id = $1 ORDER BY created_at ASC', [id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

export default app;
