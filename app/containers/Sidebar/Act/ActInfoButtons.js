// @flow
import React, { type Node } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SettingsIcon from '@material-ui/icons/Settings';

import ItemContainer from '../../../components/ItemContainer';
import styles from './ActInfoButtons.scss';
import { toggleActSettingsModal } from '../../../redux/actions/act';

type ButtonProps = {
  icon: Node,
  onClick?: () => void
};

const ActButton = ({ icon, onClick = null }: ButtonProps) => {
  const ButtonIcon = icon;
  return (
    <IconButton className={styles.customButton} size="small" onClick={onClick}>
      <ButtonIcon />
    </IconButton>
  );
};

ActButton.defaultProps = {
  onClick: null
};

type Props = {
  DToggleActSettingsModal: () => void
};

function ActInfoButtons(props: Props) {
  const { DToggleActSettingsModal } = props;
  return (
    <ItemContainer className={styles.iconSection}>
      <ActButton icon={ArrowUpwardIcon} />
      <ActButton icon={ArrowDownwardIcon} />
      <ActButton icon={SettingsIcon} onClick={DToggleActSettingsModal} />
    </ItemContainer>
  );
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      DToggleActSettingsModal: toggleActSettingsModal
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(ActInfoButtons);
