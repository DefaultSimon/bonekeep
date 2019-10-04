// @flow
import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

import type { SceneState } from '../../../redux/types/scene';
import { mapMultipleStateToProps } from '../../../redux/connect/stateToPropsCommon';
import { mapActiveScene, mapScenesArray } from '../../../redux/connect/scene';
import { setActiveScene } from '../../../redux/actions/scene';

type SceneProps = { title: string };

const Scene = (props: SceneProps) => {
  const { title, ...other } = props;

  return (
    <ListItem button {...other}>
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
  DSetActiveScene: typeof setActiveScene
};

const SceneList = (props: Props) => {
  const { DSetActiveScene, scenes = [], activeScene = {} } = props;
  const activeSceneId = activeScene.id || 0;

  return (
    <React.Fragment>
      {scenes.map((scene: SceneState) => {
        const { title, id } = scene;

        return (
          <Scene
            key={id}
            title={title}
            selected={activeSceneId === id}
            onClick={() => DSetActiveScene(id)}
          />
        );
      })}
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DSetActiveScene: setActiveScene
    },
    dispatch
  );
};

export default connect(
  mapMultipleStateToProps(mapScenesArray, mapActiveScene),
  mapDispatchToProps
)(SceneList);
