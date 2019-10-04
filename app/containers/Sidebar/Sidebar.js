// @flow
import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';

import SidebarAct from './SidebarAct';
import SidebarScenes from './SidebarScenes';

import styles from './Sidebar.scss';
import ItemContainer from '../../components/ItemContainer';

class Sidebar extends Component {
  render() {
    return (
      <ItemContainer component="section" className={styles.sidebar}>
        <SidebarAct />
        <Divider component="hr" />
        <SidebarScenes />
      </ItemContainer>
    );
  }
}

export default Sidebar;
