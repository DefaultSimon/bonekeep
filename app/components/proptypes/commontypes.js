import PropTypes from 'prop-types';

/**
 * React props.children
 */
const ReactChildren = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
]);

// eslint-disable-next-line import/prefer-default-export
export { ReactChildren };
