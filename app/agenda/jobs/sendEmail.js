const sendMail = require('../../sendMail'); // Your email logic

module.exports = (agenda) => {
  agenda.define('send weekly email', async (job) => {
    const { to, subject, text } = job.attrs.data;
    console.log(`Sending email to ${to}`);
    await sendMail({ to, subject, text });
  });
};