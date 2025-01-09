const sendEmailJob = require('./sendEmail');
const weeklyUpdateJob = require('./weeklyUpdate');

module.exports = (agenda) => {
  sendEmailJob(agenda);
  weeklyUpdateJob(agenda);
};