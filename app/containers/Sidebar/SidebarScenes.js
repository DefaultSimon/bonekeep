// @flow
import React from 'react';

import List from '@material-ui/core/List';

import styles from './Sidebar.scss';

import SceneAddModal from './Scenes/SceneAddModal';
import SceneAddFab from './Scenes/SceneAddFab';
import SceneList from './Scenes/SceneList';

const SidebarScenes = () => (
  <List className={styles.sceneList} component="div" disablePadding>
    <SceneList />
    {/* After the normal scene list:
     * Floating action button that triggers the modal
     * as well as the modal itself */}
    <SceneAddFab />
    <SceneAddModal />
  </List>
);

export default SidebarScenes;
