// @flow
import React from 'react';

import styles from './Sidebar.scss';

import ItemContainer from '../../components/ItemContainer';
import ActInfoText from './Act/ActInfoText';
import ActInfoButtons from './Act/ActInfoButtons';
import ActInfoEditModal from './Act/ActInfoEditModal';

const SidebarAct = () => (
  <ItemContainer className={styles.actBar}>
    <ActInfoText />
    <ActInfoButtons />
    <ActInfoEditModal />
  </ItemContainer>
);

export default SidebarAct;
