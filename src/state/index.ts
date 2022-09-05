import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';
import transactions from './transactions/reducer';
import application, { initialState as appInitialState } from './application/reducer';

const PERSISTED_KEYS: string[] = [
  'application.slippageTolerance',
  'application.isZap',
  'application.account',
  'application.infoBoxList',
  'application.acceptedTerms',
  'transactions',
  'timelockTransactions',
  'application.connector',
];

const store = configureStore({
  reducer: {
    application,
    transactions,
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    save({ states: PERSISTED_KEYS, namespace: 'iron_finance' }),
  ],
  preloadedState: load({
    states: PERSISTED_KEYS,
    namespace: 'iron_finance',
    preloadedState: {
      application: { ...appInitialState },
    },
  }),
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
