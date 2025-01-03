const { Client } = require('pg');

// Database client
const client = new Client({ connectionString: process.env.DATABASE_URL });

async function connectWithRetry(retries = 3, delay = 10000) {
  for (let i = 0; i < retries; i++) {
    try {
      await client.connect();
      console.log('Connected to PostgreSQL');
      break;
    } catch (err) {
      console.error(`Database connection error (attempt ${i + 1}):`, err);
      if (i < retries - 1) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('Failed to connect to PostgreSQL after multiple attempts');
      }
    }
  }
}

connectWithRetry();


const Goal = {
  async getAll() {
    const result = await client.query('SELECT * FROM goals');
    return result.rows;
  },
  async add(name, value) {
    await client.query('INSERT INTO goals (name, value) VALUES ($1, $2)', [name, value]);
  },
  async findByName(name) {
    const result = await client.query('SELECT * FROM goals WHERE name = $1', [name]);
    return result.rows[0];
  },
  async logEvent(id) {
    const result = await client.query('INSERT INTO events (goal_id, event_date) VALUES ($1, $2)', [id, new Date()]);
    return result
  }
};

module.exports = Goal;