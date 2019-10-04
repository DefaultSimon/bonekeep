// @flow
import React from 'react';
import { connect } from 'react-redux';

import styles from './ActInfoText.scss';
import ItemContainer from '../../../components/ItemContainer';
import { mapAct } from '../../../redux/connect/act';
import type { RootActState } from '../../../redux/types/act';

type Props = {
  act: RootActState
};

function ActInfoText(props: Props) {
  const {
    act: { title }
  } = props;

  return (
    <ItemContainer className={styles.infoSection}>
      <span className={styles.infoAct}>Act: </span>
      <span className={styles.title}>{title || 'No title'}</span>
    </ItemContainer>
  );
}

export default connect(
  mapAct,
  null
)(ActInfoText);
