const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;

// Connection string from environment variable
const connectionString = process.env.DATABASE_URL;

// Database client
const client = new Client({ connectionString });

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Database connection error:', err));

// Basic route
app.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT NOW()');
    res.send(`PostgreSQL connected. Server time: ${result.rows[0].now}`);
  } catch (error) {
    res.status(500).send('Error fetching data from database');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  // this a test
});