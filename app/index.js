const express = require('express');
const Goal = require('./models/goal');
const Score = require('./models/score');
const Event = require('./models/event');
const Counter = require('./models/counter');
const client = require('./helper/db');
const expressLayouts = require('express-ejs-layouts');
const Smiirl = require('./helper/smiirl');


const app = express();
const port = process.env.LOCAL_PORT || 3000;

app.use(expressLayouts);
app.set('view engine', 'ejs'); // Set EJS as the template engine
app.set('views', './views'); // Set the views directory
app.set('layout', 'pages/layout'); // Set the default layout file (relative to the 'views/pages' directory)
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the "public" directory


app.get('/', async (req, res) => {
   
    res.render('pages/index', { title: 'Overview'});
});


app.get('/scanevent', async (req, res) => {

    // get the scanned event
    const goal_id = req.query.goal_id;
    

    if (goal_id === 'showoff_plus' || goal_id === 'showoff_minus') {
      // Do something different
      console.log(`Special event: ${goal_id}`);
      const show = await Counter.showoff(goal_id);
      res.render('showoff', { title: 'showoff' });
      return;
    }

    const goal = await Goal.getGoal(goal_id);
    console.log(goal)

    const log = await Event.logEvent(goal_id, goal.base_points);
    // check if event is part of the active counter
    console.log(log)
    
    //get the updated score
    const displayScore = await Score.getScore()
    // set the proper score on the Smiirl device
    const smiirl = await Smiirl.setCounter(displayScore);
    console.log(smiirl)


    console.log(displayScore)


    res.redirect(`/goalscanned?goal=${goal.name}&goalpoints=${goal.base_points}&total=${displayScore}`);
});

app.get('/goalscanned', (req, res) => {
 
    const goal = req.query.goal;
    const goalpoints = req.query.goalpoints;
    const total = req.query.total;
    res.render('pages/goalscanned', { title: 'Goal Scanned', goal, goalpoints, total });
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