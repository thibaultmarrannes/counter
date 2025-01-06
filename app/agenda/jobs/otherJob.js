module.exports = (agenda) => {
    agenda.define('other job', async (job) => {
      console.log('Executing other job logic...');
      // Add your job-specific logic here
    });
  };