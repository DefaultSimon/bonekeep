// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SceneInfo from './SceneInfo';
import SceneSoundList from './SceneSoundList';

import styles from './Scene.scss';
import { mapActiveScene } from '../../redux/connect/scene';
import type { SceneState } from '../../redux/types/scene';

type Props = {
  activeScene: SceneState | null
};

class Scene extends Component<Props> {
  render() {
    const { activeScene = null } = this.props;
    // No scene is loaded, show the "No active scene" message
    if (activeScene === null) {
      return (
        <section className={styles.scene}>
          <div className={styles.noActiveSceneOverlay}>
            <span>No active scene...</span>
          </div>
        </section>
      );
    }

    // Otherwise, show the current scene
    const sounds = activeScene.sounds || [];
    const sceneId = activeScene.id;

    // TODO when adding a sound/changing the scene, the entire SceneList and Scene rerender
    return (
      <section className={styles.scene}>
        <SceneInfo scene={activeScene} />
        <SceneSoundList sounds={sounds} sceneId={sceneId} />
      </section>
    );
  }
}

export default connect(mapActiveScene)(Scene);
