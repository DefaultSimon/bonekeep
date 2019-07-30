// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SceneInfo from './SceneInfo';
import SceneSoundList from './SceneSoundList';

import styles from './Scene.scss';
import { mapActiveScene } from '../../redux/connect/scene';
import type { SceneState } from '../../redux/types/scene';

type Props = {
  activeScene: SceneState
};

class Scene extends Component<Props> {
  render() {
    const { activeScene = {} } = this.props;
    const sounds = activeScene.sounds || [];
    const sceneId = activeScene.id;

    return (
      <section className={styles.scene}>
        <SceneInfo scene={activeScene} />
        <SceneSoundList sounds={sounds} sceneId={sceneId} />
      </section>
    );
  }
}

export default connect(mapActiveScene)(Scene);
