// @flow
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ReactChildren } from './proptypes/commontypes';

/**
 * Font Awesome icon component
 */
function FontAwesomeIcon(props) {
  const { children, iconName, iconSize, className } = props;
  const classes = classNames(
    'fas',
    `fa-${iconName}`,
    iconSize ? `fa-${iconSize}` : null,
    className
  );

  return <i className={classes}>{children}</i>;
}

FontAwesomeIcon.propTypes = {
  children: ReactChildren,
  className: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.string
};
FontAwesomeIcon.defaultProps = {
  children: undefined,
  className: null,
  iconSize: null
};

export default FontAwesomeIcon;
