module.exports = async (agenda) => {
    // Schedule "send weekly email" job if not already scheduled
    const jobs = await agenda.jobs({ name: 'send weekly email' });
    if (jobs.length === 0) {
      await agenda.every('Monday at 10:00am', 'send weekly email', {
        to: 'user@example.com',
        subject: 'Weekly Update',
        text: 'This is your weekly update email!',
      });
      console.log('Scheduled job: send weekly email');
    }
  
    // Add additional job scheduling logic here
  };