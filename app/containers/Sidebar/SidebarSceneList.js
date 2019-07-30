// @flow
import React, { Component } from 'react';

import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import styles from './Sidebar.scss';
import modal from './SceneAddModal.scss';

import { mapActiveScene, mapScenesArray } from '../../redux/connect/scene';
import { addScene, setActiveScene } from '../../redux/actions/scene';
import type { SceneId, SceneState } from '../../redux/types/scene';
import { generateId } from '../../core/Utilities';
import Logger from '../../core/Logger';
import BonekeepModal from '../Modal/BonekeepModal';
import { mapMultipleStateToProps } from '../../redux/connect/stateToPropsCommon';

const log = new Logger('SidebarSceneList');

type SceneListProps = { children: React.Node };

const SceneList = (props: SceneListProps) => {
  const { children, ...other } = props;

  return (
    <List component="div" disablePadding {...other}>
      {children}
    </List>
  );
};

type SceneProps = { title: string };

const Scene = (props: SceneProps) => {
  const { title, ...other } = props;

  return (
    <ListItem button component="div" {...other}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      <ListItemText>{title}</ListItemText>
      <ListItemSecondaryAction>
        <ListItemIcon>
          <ButtonGroup variant="outlined" size="small">
            <IconButton>
              <PlayArrowIcon />
            </IconButton>
            <IconButton>
              <SettingsApplicationsIcon />
            </IconButton>
          </ButtonGroup>
        </ListItemIcon>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

type Props = {
  scenes: Array<SceneState>,
  activeScene: SceneState,
  DAddScene: typeof addScene,
  DSetActiveScene: typeof setActiveScene
};

class SidebarSceneList extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      currentNewTitle: ''
    };
  }

  toggleModal = () => {
    const { modalIsOpen } = this.state;

    this.setState(prevState => ({
      ...prevState,
      modalIsOpen: !modalIsOpen
    }));
  };

  handleTitleChange = (event: *) => {
    const val = event.target.value;

    this.setState(prevState => ({
      ...prevState,
      currentNewTitle: val
    }));
  };

  addNewScene = () => {
    const { DAddScene } = this.props;
    const { currentNewTitle } = this.state;

    const id = generateId();

    DAddScene(id, currentNewTitle);
    log.info(`Created new Scene with id ${id} and title '${currentNewTitle}'`);

    // Reset and close
    this.setState(prevState => ({
      ...prevState,
      modalIsOpen: false,
      currentNewTitle: ''
    }));
  };

  loadScene = (id: SceneId) => {
    const { DSetActiveScene } = this.props;

    DSetActiveScene(id);
  };

  render() {
    const { scenes = [], activeScene = {} } = this.props;
    const { modalIsOpen = false, currentNewTitle = '' } = this.state;

    const activeSceneId = activeScene.id || 0;

    return (
      <SceneList className={styles.sceneList}>
        {scenes.map((scene: SceneState) => {
          const { title, id } = scene;

          return (
            <Scene
              key={id}
              title={title}
              selected={activeSceneId === id}
              onClick={() => this.loadScene(id)}
            />
          );
        })}
        {/* Floating action button that triggers the modal */}
        <Fab
          color="primary"
          aria-label="Add"
          className={styles.fab}
          onClick={this.toggleModal}
          key="fab"
        >
          <AddIcon />
        </Fab>

        <BonekeepModal
          onCloseRequested={this.toggleModal}
          open={modalIsOpen}
          title="Add Scene"
          contentClass={modal.addSceneModal}
        >
          <TextField
            label="Scene Title"
            onChange={this.handleTitleChange}
            component="div"
            value={currentNewTitle}
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
      </SceneList>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DAddScene: addScene,
      DSetActiveScene: setActiveScene
    },
    dispatch
  );
};

export default connect(
  mapMultipleStateToProps(mapScenesArray, mapActiveScene),
  mapDispatchToProps
)(SidebarSceneList);
