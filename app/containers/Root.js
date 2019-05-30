// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import SoundSet from './SoundSet';
import { type Store as StoreType } from '../redux/types/common';

type Props = {
  store: StoreType
};

class Root extends Component<Props> {
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <SoundSet />
      </Provider>
    );
  }
}

export default Root;
