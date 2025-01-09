const client = require('../helper/db')
const Goal = require('./goal')

const Event = {
  async logEvent(id, value) {
    const result = await client.query('INSERT INTO events (goal_id, event_date, points) VALUES ($1, $2, $3)', [id, new Date(), value]);
    return result
  }
};

module.exports = Event;