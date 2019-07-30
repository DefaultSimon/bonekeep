// @flow
import React, { Component } from 'react';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DoneIcon from '@material-ui/icons/Done';
import SettingsIcon from '@material-ui/icons/Settings';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Sidebar.scss';
import modal from './ActEditModal.scss';

import Logger from '../../core/Logger';

import { renameAct, setActDescription } from '../../redux/actions/act';
import type { RootActState } from '../../redux/types/act';
import BonekeepModal from '../Modal/BonekeepModal';
import { mapAct } from '../../redux/connect/act';

const log = new Logger('SidebarActInfo');

type Props = {
  act: RootActState,
  DRenameAct: typeof renameAct,
  DSetActDescription: typeof setActDescription
};

class SidebarActInfo extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      modalTitle: '',
      modalDescription: ''
    };
  }

  toggleSettingsModal = () => {
    const { DRenameAct, DSetActDescription } = this.props;
    const { modalTitle, modalDescription, modalIsOpen } = this.state;

    this.setState(prevState => ({
      ...prevState,
      modalIsOpen: !modalIsOpen
    }));

    // check if closing
    if (modalIsOpen) {
      log.debug('Committing title and description changes...');

      DRenameAct(modalTitle);
      DSetActDescription(modalDescription);
    }
  };

  handleTitleChange = (event: *) => {
    const val = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      modalTitle: val
    }));
  };

  handleDescriptionChange = (event: *) => {
    const val = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      modalDescription: val
    }));
  };

  render() {
    const { modalIsOpen, modalTitle, modalDescription } = this.state;
    const {
      act: { title }
    } = this.props;

    return (
      <div className={styles.actBar}>
        <div className={styles.infoSection}>
          <span className={styles.infoAct}>Act: </span>
          <span className={styles.title}>
            {/* Secrets of Maple Manor - Act 2 (version 4.2) */}
            {title || 'No title'}
          </span>
        </div>
        <div className={styles.iconSection}>
          <IconButton className={styles.customButton} size="small">
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton className={styles.customButton} size="small">
            <ArrowDownwardIcon />
          </IconButton>
          <IconButton
            className={styles.customButton}
            size="small"
            onClick={this.toggleSettingsModal}
          >
            <SettingsIcon />
          </IconButton>
        </div>

        <BonekeepModal
          onCloseRequested={this.toggleSettingsModal}
          open={modalIsOpen}
          title="Edit Act"
        >
          <div className={modal.container}>
            <TextField
              label="Title"
              onChange={this.handleTitleChange}
              component="div"
              value={modalTitle}
              className={modal.titleInput}
            />
            <TextField
              multiline
              label="Description"
              onChange={this.handleDescriptionChange}
              component="div"
              value={modalDescription}
              className={modal.descriptionInput}
            />

            {/* 'Done' Button */}
            <Button
              variant="contained"
              className={modal.doneButton}
              onClick={this.toggleSettingsModal}
            >
              <DoneIcon className={modal.buttonIcon} />
              Done
            </Button>
          </div>
        </BonekeepModal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DRenameAct: renameAct,
      DSetActDescription: setActDescription
    },
    dispatch
  );
};

export default connect(
  mapAct,
  mapDispatchToProps
)(SidebarActInfo);
