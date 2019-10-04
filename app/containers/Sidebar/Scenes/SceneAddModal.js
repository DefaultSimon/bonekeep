// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import modal from './SceneAddModal.scss';

import getLogger from '../../../core/Logger';
import BonekeepModal from '../../Modal/BonekeepModal';
import { generateId } from '../../../core/Utilities';
import { mapAddingScene } from '../../../redux/connect/scene';
import { addScene, toggleSceneAddModal } from '../../../redux/actions/scene';

const log = getLogger('SceneAddModal');

type Props = {
  addingScene: boolean,
  DAddScene: typeof addScene,
  DToggleSceneAddModal: typeof toggleSceneAddModal
};

class SceneAddModal extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      currentSceneTitle: ''
    };
  }

  addNewScene = () => {
    const { DAddScene, DToggleSceneAddModal } = this.props;
    const { currentSceneTitle } = this.state;

    const id = generateId();

    DAddScene(id, currentSceneTitle);
    log.debug(
      `Created new Scene with id ${id} and title '${currentSceneTitle}'`
    );

    // Reset scene title
    this.setState(prevState => ({
      ...prevState,
      currentSceneTitle: ''
    }));

    // When added, close the modal
    DToggleSceneAddModal();
  };

  handleTitleChange = (event: *) => {
    const val = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      currentSceneTitle: val
    }));
  };

  render() {
    const { addingScene: modalIsOpen } = this.props;
    const { currentSceneTitle } = this.state;

    return (
      <BonekeepModal
        onCloseRequested={this.toggleModal}
        open={modalIsOpen}
        title="Add Scene"
        contentClass={modal.addSceneModal}
      >
        {/* TODO focus on initial open */}
        <TextField
          label="Scene Title"
          onChange={this.handleTitleChange}
          component="div"
          value={currentSceneTitle}
          className={modal.textField}
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
