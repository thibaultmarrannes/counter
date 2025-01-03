const express = require('express');
const Goal = require('./models/goal');

const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // Set EJS as the template engine
app.set('views', './views'); // Set the views directory

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

app.get('/', async (req, res) => {
    const goals = await Goal.getAll();
    console.log(goals);
    res.render('index', { title: 'example', goals: goals });


});

app.get('/addgoal', (req, res) => {
   // in the end this should allow you to add goals, but let's start with just 1
   res.render('addgoal', {});
});

app.get('/scanevent', async (req, res) => {

    // get the scanned event
    const name = req.query.name;
    // get the goal from the database & check if scanned event exists
    const goal = await Goal.findByName(name);
    if (!goal) {
      return res.status(404).send('Goal not found');
    }
    console.log(goal)
    // log a event in the database
    const log = await Goal.logEvent(goal.id)
    // get the counter value

    // return the counter


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