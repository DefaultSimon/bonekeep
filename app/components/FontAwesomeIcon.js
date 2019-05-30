// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';

type Props = {
  children?: Node,
  className?: string | null,
  iconName: string | null,
  iconSize?: string | null,
  color?: string | null
};

/**
 * Font Awesome icon component
 */
function FontAwesomeIcon(props: Props) {
  const { children, iconName, iconSize, className, color } = props;
  const classes = classNames(
    'fas',
    iconName ? `fa-${iconName}` : null,
    iconSize ? `fa-${iconSize}` : null,
    className,
    color
  );

  return <i className={classes}>{children}</i>;
}

FontAwesomeIcon.defaultProps = {
  className: null,
  iconSize: null,
  color: null,
  children: []
};

export default FontAwesomeIcon;
