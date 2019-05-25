// @flow
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ReactChildren } from './proptypes/commontypes';
import styles from './Button.scss';

function Button(props) {
  const { onClick, children, customBgClassName, className, ...other } = props;
  const classes = classNames(
    styles.button,
    customBgClassName || styles.button_bg
  );

  return (
    <span
      role="button"
      tabIndex={0}
      className={classes}
      onClick={onClick}
      {...other}
    >
      {children}
    </span>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: ReactChildren.isRequired,
  className: PropTypes.string,
  customBgClassName: PropTypes.string
};
Button.defaultProps = {
  onClick: undefined,
  className: undefined,
  customBgClassName: undefined
};

export default Button;
