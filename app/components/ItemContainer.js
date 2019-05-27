// @flow
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ReactChildren } from './proptypes/commontypes';

/**
 * General-purpose (stateless) component
 */
function ItemContainer(props) {
  const { children, className, bgColor, ...other } = props;
  const classes = classNames(className, `bg-${bgColor}`);

  return (
    <span className={classes} {...other}>
      {children}
    </span>
  );
}

ItemContainer.propTypes = {
  children: ReactChildren.isRequired,
  className: PropTypes.string,
  bgColor: PropTypes.string
};
ItemContainer.defaultProps = {
  className: null,
  bgColor: null
};

export default ItemContainer;
