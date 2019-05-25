import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';

import { createStore } from 'redux';
import rootReducer from './reducers/root';

import Root from './containers/Root';
import './app.global.scss';

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

// Configure redux store
let reduxStore;
if (process.env.NODE_ENV === 'production') {
  reduxStore = createStore(rootReducer);
} else {
  reduxStore = createStore(
    rootReducer,
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

render(
  <AppContainer>
    <Root store={reduxStore} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={reduxStore} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
