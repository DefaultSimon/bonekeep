// @flow
import React, { Component } from 'react';

type Props = {};

class Sound extends Component<Props> {
  render() {
    return (
      <div>
        {/* Four sections: name, randomness, toggles and volume */}
        <div>Name</div>
        <div>Randomness</div>
        <div>Toggle buttons</div>
        <div>volume</div>
      </div>
    );
  }
}

export default Sound;
