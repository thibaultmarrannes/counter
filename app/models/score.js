const client = require('../helper/db')

const Score = {
  async getScore(){
    const result = await client.query('select sum(events.points) from events')
    console.log(result.rows[0].sum)
    return result.rows[0].sum
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