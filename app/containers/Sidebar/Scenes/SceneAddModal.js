// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';

import modal from './SceneAddModal.scss';

import getLogger from '../../../core/Logger';
import BonekeepModal from '../../Modal/BonekeepModal';
import { generateId } from '../../../core/Utilities';
import { mapAddingScene } from '../../../redux/connect/scene';
import { addScene, toggleSceneAddModal } from '../../../redux/actions/scene';
import BonekeepTextField from '../../TextField/BonekeepTextField';

const log = getLogger('SceneAddModal');

type Props = {
  addingScene: boolean,
  DAddScene: typeof addScene,
  DToggleSceneAddModal: typeof toggleSceneAddModal
};

class SceneAddModal extends Component<Props> {
  constructor(props) {
    super(props);

    this.titleInputRef = React.createRef();
  }

  addNewScene = () => {
    const { DAddScene, DToggleSceneAddModal } = this.props;

    // Get scene title from input and generate an ID for the new scene
    const currentTitle = this.titleInputRef.current.getCurrentValue();
    const id = generateId();

    DAddScene(id, currentTitle);
    log.debug(`Created new Scene with id ${id} and title '${currentTitle}'`);

    // Reset scene title
    this.titleInputRef.current.updateCurrentValue('');
    // Close the modal
    DToggleSceneAddModal();
  };

  render() {
    const { addingScene: modalIsOpen, DToggleSceneAddModal } = this.props;

    return (
      <BonekeepModal
        onCloseRequested={DToggleSceneAddModal}
        open={modalIsOpen}
        title="Add Scene"
        contentClass={modal.addSceneModal}
      >
        {/* TODO focus on initial open */}
        <BonekeepTextField
          className={modal.textField}
          label="Scene Title"
          component="div"
          ref={this.titleInputRef}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.addNewScene}
          className={modal.addButton}
        >
          Create
        </Button>
      </BonekeepModal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DAddScene: addScene,
      DToggleSceneAddModal: toggleSceneAddModal
    },
    dispatch
  );
};

export default connect(
  mapAddingScene,
  mapDispatchToProps
)(SceneAddModal);
