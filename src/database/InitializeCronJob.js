import cron from 'node-cron';

import refreshDatabase from './RefreshDB';

export default () => {
  console.log('Initializing database');
  refreshDatabase();
  cron.schedule('*/30 * * * *', () => {
    console.log('Polling Crucible');
    refreshDatabase();
  });
};
