// @flow
import React, { Component } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import Sound from './Sound';

// readdir('.', { withFileTypes: true }, (_, dir) => {
//   console.log(dir);
// });

class Root extends Component {
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <div className="flex">
          <Sound soundId={0} />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.shape(Store).isRequired
};

export default Root;
