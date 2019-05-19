// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Home.scss';

export default class Home extends Component {
  render() {
    const { sampleText } = this.props;

    return (
      <div className={styles.container}>
        <h2>Home</h2>
        <p>{sampleText}</p>
      </div>
    );
  }
}

Home.propTypes = {
  sampleText: PropTypes.node
};

Home.defaultProps = {
  sampleText: ''
};
