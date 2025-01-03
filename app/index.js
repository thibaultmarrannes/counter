const express = require('express');
const Goal = require('./models/goal');
const Score = require('./models/score');
const Event = require('./models/event');
const Counter = require('./models/counter');
const client = require('./db');



const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // Set EJS as the template engine
app.set('views', './views'); // Set the views directory
app.use(express.urlencoded({ extended: true }));

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
    const setcounter = await Counter.setActiveCounter(8)
    const currentScore = await Score.getActiveScore()
    console.log(setcounter);
    console.log(goals);
    console.log(currentScore)
    res.render('index', { title: 'example', goals: goals, currentscore: currentScore});


});

app.post('/addgoal', async (req, res) => {
  try {
    const name = req.body.name; // Goal name
    const value = parseInt(req.body.value, 10); // Goal value
    const counters = req.body.counters; // Selected counters (array or string)

    // Ensure counters is always an array
    const selectedCounters = Array.isArray(counters) ? counters : [counters];

    console.log('Goal Name:', name);
    console.log('Goal Value:', value);
    console.log('Selected Counters:', selectedCounters);

    const addGoal = await Goal.addGoal(name, value, counters);
    console.log("Add goal success")
    console.log(addGoal)

    res.redirect('/'); // Replace with the page you want to redirect to
} catch (error) {
    console.error('Error adding goal:', error);
    res.status(500).send('An error occurred while adding the goal.');
}
});


app.get('/scanevent', async (req, res) => {

    // get the scanned event
    const name = req.query.name;
    // get the goal from the database & check if scanned event exists
    const goal = await Goal.findGoalByName(name);
    if (!goal) {
      counters = await Counter.getAll();
      res.render('addgoal', { title: 'Add Goal', name: name, counters:counters });
      return;
    }
    
    console.log(goal)
    // log a event in the database
    const log = await Event.logEvent(goal.id)
    // check if event is part of the active counter
    console.log(log)
    
    //get the updated score
    const displayScore = await Score.getActiveScore()
    // set the proper score on the Smiirl device
    console.log(displayScore)


    res.render('goalscanned', { title: 'Your goal was scanned succesfully!', goal: goal.name, goalpoints: goal.value, total: displayScore });
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