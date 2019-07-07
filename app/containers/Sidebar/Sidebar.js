// @flow
import React, { Component } from 'react';
import SidebarActInfo from './SidebarActInfo';
import SidebarSceneList from './SidebarSceneList';

import styles from './Sidebar.scss';

type Props = {};

class Sidebar extends Component<Props> {
  render() {
    return (
      <section className={styles.sidebar}>
        <SidebarActInfo />
        <SidebarSceneList />
      </section>
    );
  }
}

export default Sidebar;
