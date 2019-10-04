// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';

import modal from './ActInfoEditModal.scss';
import BonekeepModal from '../../Modal/BonekeepModal';

import {
  setActDescription,
  setActTitle,
  toggleActSettingsModal
} from '../../../redux/actions/act';
import { mapAct } from '../../../redux/connect/act';
import type { RootActState } from '../../../redux/types/act';
import Logger from '../../../core/Logger';
import ItemContainer from '../../../components/ItemContainer';

const log = new Logger('ActInfoEditModal');

type Props = {
  act: RootActState,
  DToggleActSettingsModal: typeof toggleActSettingsModal,
  DSetActTitle: typeof setActTitle,
  DSetActDescription: typeof setActDescription
};

class ActInfoEditModal extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      modalTitle: '',
      modalDescription: ''
    };
  }

  /**
   * Called by TextField when the title input changes.
   */
  handleTitleChange = (event: *) => {
    const val = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      modalTitle: val
    }));
  };

  /**
   * Called by TextField when the description input changes.
   */
  handleDescriptionChange = (event: *) => {
    const val = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      modalDescription: val
    }));
  };

  /**
   * Handle changes before toggling the modal
   */
  handleModalCloseRequest = () => {
    const {
      modalTitle: newTitle,
      modalDescription: newDescription
    } = this.state;
    const {
      DSetActTitle,
      DSetActDescription,
      DToggleActSettingsModal,
      act: { editing, title: previousTitle, description: previousDescription }
    } = this.props;

    // Check if the modal will close (when editing is true)
    // Save changes values if so
    if (editing) {
      if (previousTitle !== newTitle && newTitle) {
        log.debug(`Title changed to ${newTitle}`);
        DSetActTitle(newTitle);
      }
      if (previousDescription !== newDescription && newDescription) {
        log.debug(`Description changed to ${newDescription}`);
        DSetActDescription(newDescription);
      }

      // After saving changes, close the modal
      DToggleActSettingsModal();
    }
  };

  render() {
    const { modalTitle, modalDescription } = this.state;
    const {
      act: { editing }
    } = this.props;

    return (
      <BonekeepModal
        onCloseRequested={this.handleModalCloseRequest}
        open={editing}
        title="Edit Act"
      >
        <ItemContainer className={modal.container}>
          <TextField
            label="Title"
            onChange={this.handleTitleChange}
            component="div"
            value={modalTitle}
            className={modal.titleInput}
          />
          <TextField
            label="Description"
            onChange={this.handleDescriptionChange}
            component="div"
            value={modalDescription}
            className={modal.descriptionInput}
            multiline
          />

          {/* 'Done' Button */}
          <Button
            variant="contained"
            className={modal.doneButton}
            onClick={this.handleModalCloseRequest}
          >
            <DoneIcon className={modal.buttonIcon} />
            Done
          </Button>
        </ItemContainer>
      </BonekeepModal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DSetActTitle: setActTitle,
      DSetActDescription: setActDescription,
      DToggleActSettingsModal: toggleActSettingsModal
    },
    dispatch
  );
};

export default connect(
  mapAct,
  mapDispatchToProps
)(ActInfoEditModal);
