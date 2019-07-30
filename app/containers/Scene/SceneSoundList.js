// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Sound from '../Sound/Sound';
import { addSound } from '../../redux/actions/sounds';
import { generateId } from '../../core/Utilities';

import styles from './Scene.scss';
import type { SceneId, SceneSoundsState } from '../../redux/types/scene';

type Props = {
  sounds: SceneSoundsState,
  sceneId: SceneId,
  DAddSound: typeof addSound
};

class SceneSoundList extends Component<Props> {
  onFabClick = () => {
    const { DAddSound, sceneId } = this.props;
    const soundId = generateId();

    DAddSound(soundId, sceneId);
  };

  render() {
    const { sounds = [], sceneId } = this.props;

    return (
      <div className={styles.soundContainer}>
        {sounds.map(soundId => (
          <Sound key={soundId} soundId={soundId} sceneId={sceneId} />
        ))}

        <Fab
          color="primary"
          aria-label="Add"
          className={styles.fab}
          onClick={this.onFabClick}
          key="fab"
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DAddSound: addSound
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(SceneSoundList);
