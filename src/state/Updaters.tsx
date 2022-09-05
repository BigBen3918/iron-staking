import React from 'react';
import ApplicationUpdater from './application/updater';
import TransactionUpdater from './transactions/updater';

const Updaters: React.FC = () => {
  return (
    <>
      <ApplicationUpdater />
      <TransactionUpdater />
    </>
  );
};

export default Updaters;
