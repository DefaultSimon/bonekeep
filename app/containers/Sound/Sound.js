// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import SettingsIcon from '@material-ui/icons/Settings';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';

import styles from './Sound.scss';
import { mapSound } from '../../redux/connect/sound';
import {
  setSoundAutoplay,
  setSoundFile,
  setSoundLoop,
  setSoundMuteStatus,
  setSoundName,
  setSoundPlaying
} from '../../redux/actions/sounds';
import type { SoundId, SoundState } from '../../redux/types/sounds';
import type { SceneId } from '../../redux/types/scene';
import SoundEditModal from './SoundEditModal';
import SoundMeter from './SoundMeter';

type ActiveToggleProps = {
  active?: boolean
};

const MuteToggle = (props: ActiveToggleProps) => {
  const { active, ...other } = props;

  return (
    <Button
      size="small"
      component="div"
      className={classNames(
        styles.muteToggle,
        styles.minWidthFix,
        active ? styles.active : ''
      )}
      disableRipple
      {...other}
    >
      M
    </Button>
  );
};
MuteToggle.defaultProps = {
  active: false
};

const AutoplayToggle = (props: ActiveToggleProps) => {
  const { active, ...other } = props;

  return (
    <Button
      size="small"
      component="div"
      className={classNames(
        styles.autoplayToggle,
        styles.minWidthFix,
        active ? styles.active : ''
      )}
      disableRipple
      {...other}
    >
      A
    </Button>
  );
};
AutoplayToggle.defaultProps = {
  active: false
};

type PlayToggleProps = {
  playing?: boolean
};

const PlayToggle = (props: PlayToggleProps) => {
  const { playing, ...other } = props;

  return (
    <IconButton
      component="div"
      className={classNames(styles.playToggle, playing ? styles.active : '')}
      size="small"
      disableRipple
      {...other}
    >
      {playing ? <StopOutlinedIcon /> : <PlayCircleOutlineIcon />}
    </IconButton>
  );
};
PlayToggle.defaultProps = {
  playing: false
};

const SettingsToggle = props => {
  return (
    <IconButton
      component="div"
      className={classNames(styles.settingsToggle)}
      size="small"
      disableRipple
      {...props}
    >
      <SettingsIcon />
    </IconButton>
  );
};

type Props = {
  soundId: SoundId,
  sceneId: SceneId,
  sound: SoundState,
  DSetSoundName: typeof setSoundName,
  DSetSoundFile: typeof setSoundFile,
  DSetSoundMuteStatus: typeof setSoundMuteStatus,
  DSetSoundAutoplay: typeof setSoundAutoplay,
  DSetSoundPlaying: typeof setSoundPlaying,
  DSetSoundLoop: typeof setSoundLoop
};

class Sound extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
  }

  toggleModal = () => {
    const { modalIsOpen } = this.state;
    const isNowOpen = !modalIsOpen;

    this.setState(prevState => ({
      ...prevState,
      modalIsOpen: isNowOpen
    }));
  };

  toggleMute = () => {
    const { DSetSoundMuteStatus, soundId, sceneId, sound } = this.props;
    const isNowMuted = !sound.muted;

    DSetSoundMuteStatus(soundId, sceneId, isNowMuted);
  };

  toggleAutoplay = () => {
    const { DSetSoundAutoplay, soundId, sceneId, sound } = this.props;
    const autoplay = !sound.autoplay;

    DSetSoundAutoplay(soundId, sceneId, autoplay);
  };

  togglePlaying = () => {
    const { DSetSoundPlaying, soundId, sceneId, sound } = this.props;
    const isPlaying = !sound._playing;

    DSetSoundPlaying(soundId, sceneId, isPlaying);
  };

  commitModalChanges = (newName, newFile, newLoop) => {
    const {
      DSetSoundName,
      DSetSoundFile,
      DSetSoundLoop,
      soundId,
      sceneId,
      sound = {}
    } = this.props;
    const { name = null, file = null, loop = false } = sound;

    // Only dispatch if changed
    if (newName !== name) {
      console.log(`Name changed: ${newName}, ${name}`);
      DSetSoundName(soundId, sceneId, newName);
    }
    if (newFile !== file && newFile !== '') {
      console.log(`File changed: ${newFile}, ${file}`);
      DSetSoundFile(soundId, sceneId, newFile);
    }
    if (newLoop !== loop) {
      console.log(`Loop changed: ${newLoop}, ${loop}`);
      DSetSoundLoop(soundId, sceneId, newLoop);
    }
  };

  render() {
    const { sound = {}, soundId, sceneId } = this.props;
    const {
      name = '',
      muted = false,
      autoplay = false,
      _playing = false
    } = sound;
    const { modalIsOpen } = this.state;

    return (
      <React.Fragment>
        <div className={styles.sound}>
          {/* Four sections: name, randomness (combined into left), toggles and volume */}
          <div className={styles.left}>
            <div className={styles.name}>{name}</div>
            <div className={styles.randomness}>
              <LinearProgress
                variant="determinate"
                value={15}
                classes={{ root: styles.progressBar }}
              />
            </div>
          </div>
          <div className={styles.toggles}>
            <MuteToggle onClick={this.toggleMute} active={muted} />
            <AutoplayToggle onClick={this.toggleAutoplay} active={autoplay} />
            <PlayToggle onClick={this.togglePlaying} playing={_playing} />
            <SettingsToggle onClick={this.toggleModal} />
          </div>
          <div className={styles.volume}>
            <SoundMeter soundId={soundId} sceneId={sceneId} />
          </div>
        </div>

        <SoundEditModal
          commitCallback={this.commitModalChanges}
          toggleCallback={this.toggleModal}
          open={modalIsOpen}
          sound={sound}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DSetSoundName: setSoundName,
      DSetSoundFile: setSoundFile,
      DSetSoundMuteStatus: setSoundMuteStatus,
      DSetSoundAutoplay: setSoundAutoplay,
      DSetSoundPlaying: setSoundPlaying,
      DSetSoundLoop: setSoundLoop
    },
    dispatch
  );
};

export default connect(
  mapSound,
  mapDispatchToProps
)(Sound);
