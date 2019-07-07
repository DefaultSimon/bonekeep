// @flow
import React, { Component } from 'react';
import SceneInfo from './SceneInfo';
import SceneSoundList from './SceneSoundList';

import styles from './Scene.scss';

type Props = {};

class Scene extends Component<Props> {
  render() {
    return (
      <section className={styles.scene}>
        <SceneInfo />
        <SceneSoundList />
      </section>
    );
  }
}

export default Scene;
