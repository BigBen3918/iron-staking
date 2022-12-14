import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

if ('ethereum' in window) {
  window.ethereum.autoRefreshOnNetworkChange = false;
  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
