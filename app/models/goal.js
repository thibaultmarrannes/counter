const { Client } = require('pg');

// Database client
const client = new Client({ connectionString: process.env.DATABASE_URL });

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Database connection error:', err));


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