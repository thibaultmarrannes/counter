const client = require('../helper/db')

const Goal = {
  async getAll() {
    const result = await client.query('SELECT * FROM goals');
    return result.rows;
  },

  async getGoal(id) {
    const result = await client.query('SELECT * FROM goals WHERE id = $1', [id]);
    return result.rows[0];
  },
};

module.exports = Goal;