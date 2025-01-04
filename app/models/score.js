const client = require('../helper/db')

const Score = {
  async getActiveScore(){
    const result = await client.query('select sum(events.score) from events join goals on events.goal_id = goals.id join counter_goals on goals.id = counter_goals.goal_id join counter on counter_goals.counter_id = counter.id where counter.active = true')
    console.log(result.rows[0].sum)
    return result.rows[0].sum
  },
  async getScoreById(id){
    const result = await client.query('select sum(events.score) from events join goals on events.goal_id = goals.id join counter_goals on goals.id = counter_goals.goal_id join counter on counter_goals.counter_id = counter.id where counter.id = $1', [id])
    return result
  },
  async showoff(type){
    const result = await this.getActiveScore();
    if (type === 'showoff_plus') {
        result += 111;
    } else if (type === 'showoff_minus') {
        result = Math.max(0, result - 111);
    }
    return result
  }

};

module.exports = Score;