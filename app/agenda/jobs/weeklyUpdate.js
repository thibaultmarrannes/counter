module.exports = (agenda) => {
    agenda.define('weekly-update', async (job) => {
      console.log('executing weekly-update job');
      // Add your job-specific logic here
    });
  };