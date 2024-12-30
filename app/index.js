const express = require('express');
const { Client } = require('pg');
const { Counter } = require("@smiirl/smiirl-library-js");

const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // Set EJS as the template engine
app.set('views', './views'); // Set the views directory



// Connection string from environment variable
const connectionString = process.env.DATABASE_URL;

// Database client
const client = new Client({ connectionString });

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Database connection error:', err));

// Basic route

/*
app.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT NOW()');
    res.send(`this is a test PostgreSQL connected. Server time: ${result.rows[0].now}`);
  } catch (error) {
    res.status(500).send('Error fetching data from database');
  }
});

*/

app.get('/', (req, res) => {
   // example: res.render('index', { title: 'Complex HTML', items: ['Item 1', 'Item 2', 'Item 3'] });
   res.render('index', { title: 'example', goals: ['Goal 1', 'Goal 2', 'Goal 3'] });
});

app.get('/addgoal', (req, res) => {
   // in the end this should allow you to add goals, but let's start with just 1
   res.render('addgoal', {});
});

app.get('/scanevent', (req, res) => {
    // get the scanned goal
    const name = req.query.name;
    // get the goal from the database
    // log a event in the database
    // adjust the counter in the database
    // return the counter
    console.log(name);

    Counter.push(12345).then(function(json) {
        console.log("Counter Push Response", json)
    }).catch(function(error) {
        console.log("Counter Push Error", error)
    }).then(function() {
        console.log("Counter Push Done")
    });
    res.render('goalscanned', { title: 'example', goal: name, goalpoints: 10, total: 100 });
});

app.get('/counter', (req, res) => {
    // get the counter value from the database
    // set the json response
    // return the counter
    res.json({ counter: 100 });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  // this a test
});