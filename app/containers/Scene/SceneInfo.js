// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';
import SettingsApplications from '@material-ui/icons/SettingsApplications';

import styles from './Scene.scss';
import { mapActiveScene } from '../../redux/connect/scene';
import type { SceneState } from '../../redux/types/scene';

type Props = {
  activeScene: SceneState
};

class SceneInfo extends Component<Props> {
  render() {
    const { activeScene = {} } = this.props;
    const sceneTitle = activeScene.title || '';

    return (
      <div className={styles.infoSection}>
        {/* Left side: split into top and bottom */}
        <div className={styles.titleSection}>
          <span className={styles.type}>Scene:</span>
          <span className={styles.title}>{sceneTitle}</span>
        </div>
        <div className={styles.buttonSection}>
          {/* Buttons */}
          <IconButton className={styles.customButton} size="medium">
            <PlayArrow />
          </IconButton>
          <IconButton className={styles.customButton} size="medium">
            <Stop />
          </IconButton>
          <IconButton className={styles.customButton} size="medium">
            <SettingsApplications />
          </IconButton>
        </div>
        {/* Right side: volume bar */}
        {/* <div></div> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapActiveScene,
  mapDispatchToProps
)(SceneInfo);
