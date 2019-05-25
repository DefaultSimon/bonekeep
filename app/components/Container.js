// @flow
import React from 'react';
import PropTypes from 'prop-types';

import { ReactChildren } from './proptypes/commontypes';

/**
 * General-purpose (stateless) component
 */
function Container(props) {
  const { children, className, ...other } = props;

  return (
    <span className={className} {...other}>
      {children}
    </span>
  );
}

Container.propTypes = {
  children: ReactChildren.isRequired,
  className: PropTypes.string
};
Container.defaultProps = {
  className: null
};

export default Container;
