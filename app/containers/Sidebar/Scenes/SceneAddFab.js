// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import styles from './SceneAddFab.scss';
import { toggleSceneAddModal } from '../../../redux/actions/scene';

type Props = {
  DToggleSceneAddModal: typeof toggleSceneAddModal
};

const SceneAddFab = (props: Props) => {
  const { DToggleSceneAddModal } = props;
  return (
    <Fab
      color="primary"
      aria-label="Add"
      className={styles.fab}
      onClick={DToggleSceneAddModal}
      key="fab"
    >
      <AddIcon />
    </Fab>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DToggleSceneAddModal: toggleSceneAddModal
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(SceneAddFab);
