// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './Button.scss';

type Props = {
  children: Node,
  onClick?: () => void,
  customBgClassName?: string,
  className?: string
};

function Button(props: Props) {
  const {
    children,
    onClick = () => {},
    customBgClassName = null,
    className = null,
    ...other
  } = props;

  const classes = classNames(
    styles.button,
    customBgClassName || styles.button_bg,
    className
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

Button.defaultProps = {
  onClick: null,
  className: null,
  customBgClassName: null
};

export default Button;
