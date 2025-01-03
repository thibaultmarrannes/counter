const client = require('../db')
const Goal = require('./goal')

const Event = {
  async logEvent(id) {
    const value = await Goal.findGoalValueById(id)
    const result = await client.query('INSERT INTO events (goal_id, event_date, score) VALUES ($1, $2, $3)', [id, new Date(), value]);
    return result
  }
};

module.exports = Event;