const client = require('../helper/db')

const Counter = {

  async getAll() {
    const result = await client.query('SELECT * FROM counter');
    console.log(result)
    return result.rows; //test
  },
  async getActiveCounter() {
    const result = await client.query('select * from counter where active = true')
    console.log(result)
    return result
  },
  async setActiveCounter(id) {
    const result = await client.query('UPDATE counter SET active = CASE WHEN id = $1 THEN TRUE ELSE FALSE END WHERE EXISTS (SELECT 1 FROM counter WHERE id = $1)', [id])
    console.log(result)
    return result
  }
};

module.exports = Counter;