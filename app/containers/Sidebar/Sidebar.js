// @flow
import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';

import SidebarActInfo from './SidebarActInfo';
import SidebarSceneList from './SidebarSceneList';

import styles from './Sidebar.scss';

type Props = {};

class Sidebar extends Component<Props> {
  render() {
    return (
      <section className={styles.sidebar}>
        <SidebarActInfo />
        <Divider component="hr" />
        <SidebarSceneList />
      </section>
    );
  }
}

export default Sidebar;
