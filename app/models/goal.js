const client = require('../db')

const Goal = {
  async getAll() {
    const result = await client.query('SELECT * FROM goals');
    return result.rows;
  },
  async addGoal(name, value, counters) {
    const newGoal = await client.query('INSERT INTO goals (name, value) VALUES ($1, $2)', [name, value]);
    const getNewGoal = await Goal.findGoalByName(name)
    console.log("new goal")
    console.log(getNewGoal)
    await Promise.all(
      counters.map(element =>
        client.query('INSERT INTO counter_goals (counter_id, goal_id) VALUES ($1, $2)', [element, getNewGoal.id])
      )
    );
    return "Geat success"
  },
  async findGoalByName(name) {
    const result = await client.query('SELECT * FROM goals WHERE name = $1', [name]);
    return result.rows[0];
  },
  async findGoalValueById(id) {
    const result = await client.query('SELECT * FROM goals WHERE id = $1', [id]);
    return result.rows[0].value;
  }
};

module.exports = Goal;