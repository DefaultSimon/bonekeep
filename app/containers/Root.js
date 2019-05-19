// @flow
import React, { Component } from 'react';

import Home from '../components/Home';

class Root extends Component {
  render() {
    return (
      <span>
        <span>Hmm</span>
        <Home sampleText="okay" />
      </span>
    );
  }
}

export default Root;
