// @flow
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ReactChildren } from './proptypes/commontypes';

/**
 * Font Awesome icon component
 */
function FontAwesomeIcon(props) {
  const { children, iconName, iconSize, className, color } = props;
  const classes = classNames(
    'fas',
    `fa-${iconName}`,
    iconSize ? `fa-${iconSize}` : null,
    className,
    color
  );

  return <i className={classes}>{children}</i>;
}

const generateColorNames = (colors: Array) => {
  const full = [];

  if (colors.length === 0) {
    throw new Error("'colors' is empty");
  }

  colors.forEach(color => {
    full.push(`c-${color}`, `c-${color}-light`, `c-${color}-dark`);
  });

  return full;
};

const colors = generateColorNames(['primary', 'secondary', 'transparent']);

FontAwesomeIcon.propTypes = {
  children: ReactChildren,
  className: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.string,
  color: PropTypes.oneOf(colors)
};
FontAwesomeIcon.defaultProps = {
  children: undefined,
  className: null,
  iconSize: null,
  color: null
};

export default FontAwesomeIcon;
