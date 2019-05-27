// @flow
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Card.scss';
import { ReactChildren } from './proptypes/commontypes';

function Card(props) {
  const { children, className, ...other } = props;
  const classes = classNames(styles.card, className);

  return (
    <span className={classes} {...other}>
      {children}
    </span>
  );
}

Card.propTypes = {
  children: ReactChildren.isRequired,
  className: PropTypes.string
};
Card.defaultProps = {
  className: null
};

export default Card;
