const sendEmailJob = require('./sendEmail');
const otherJob = require('./otherJob');

module.exports = (agenda) => {
  sendEmailJob(agenda);
  otherJob(agenda);
};