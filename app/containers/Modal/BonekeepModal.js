// @flow
import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import classNames from 'classnames';

import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

import styles from './BonekeepModal.scss';

type Props = {
  open: boolean,
  children: ?React.Node,
  title?: string,
  onCloseRequested: () => void,
  contentClass?: string
};

class BonekeepModal extends Component<Props> {
  render() {
    const {
      children,
      open,
      title,
      onCloseRequested,
      contentClass,
      ...modalOptions
    } = this.props;

    const contentClassNames = classNames(styles.content, contentClass);

    return (
      <Modal
        open={open}
        onBackdropClick={onCloseRequested}
        className={styles.modal}
        {...modalOptions}
      >
        <div className={styles.modalPaper}>
          <div className={styles.topBar}>
            <span className={styles.title}>{title}</span>
            <IconButton onClick={onCloseRequested} className={styles.buttonFix}>
              <ClearIcon />
            </IconButton>
          </div>
          <div className={contentClassNames}>{children}</div>
        </div>
      </Modal>
    );
  }
}

BonekeepModal.defaultProps = {
  title: '',
  contentClass: ''
};

export default BonekeepModal;
