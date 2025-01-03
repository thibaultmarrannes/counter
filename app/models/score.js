const client = require('../db')

const Score = {
  async getActiveScore(){
    const result = await client.query('select sum(events.score) from events join goals on events.goal_id = goals.id join counter_goals on goals.id = counter_goals.goal_id join counter on counter_goals.counter_id = counter.id where counter.active = true')
    console.log(result.rows[0].sum)
    return result.rows[0].sum
  },
  async getScoreById(id){
    const result = await client.query('select sum(events.score) from events join goals on events.goal_id = goals.id join counter_goals on goals.id = counter_goals.goal_id join counter on counter_goals.counter_id = counter.id where counter.id = $1', [id])
    return result
  }
};

module.exports = Score;