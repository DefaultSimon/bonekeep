// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { type Store as StoreType } from '../redux/types/common';
import Sidebar from './Sidebar/Sidebar';
import Scene from './Scene/Scene';
import ItemContainer from '../components/ItemContainer';

type Props = {
  store: StoreType
};

class Root extends Component<Props> {
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <ItemContainer className="flex row h-full">
          <Sidebar />
          <Scene />
        </ItemContainer>
      </Provider>
    );
  }
}

export default Root;
