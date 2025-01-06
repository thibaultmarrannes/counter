const { Agenda } = require('agenda');
const AgendaSql = require('agenda-sql');
const { Client } = require('pg');

// Initialize PostgreSQL client
const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  await pgClient.connect(); // Connect to PostgreSQL
})();

// Set up Agenda with agenda-sql
const agenda = new Agenda({
  name: 'agenda-job-processor',
  defaultLockLifetime: 10000,
  processEvery: '30 seconds', // Check for jobs every 30 seconds
  db: new AgendaSql(pgClient), // Use agenda-sql
});

module.exports = agenda;