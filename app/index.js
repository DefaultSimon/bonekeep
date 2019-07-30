import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';

import reduxStore from './redux/store';
import Root from './containers/Root';

// Import custom stylesheets
import './styles/main.scss';

// TODO optimize
// https://github.com/maicki/why-did-you-update

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

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
