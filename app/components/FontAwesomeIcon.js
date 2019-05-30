// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';

type iconSizes =
  | 'xs'
  | 'sm'
  | 'lg'
  | '2x'
  | '3x'
  | '4x'
  | '5x'
  | '6x'
  | '7x'
  | '8x'
  | '9x'
  | '10x';

type iconColors =
  | 'c-primary'
  | 'c-primary-dark'
  | 'c-primary-light'
  | 'c-secondary'
  | 'c-secondary-dark'
  | 'c-secondary-light'
  | 'c-transparent'
  | 'c-transparent-dark'
  | 'c-transparent-light';

type Props = {
  children?: Node,
  className?: string | null,
  iconName: string | null,
  iconSize?: string | iconSizes,
  color?: string | iconColors
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
