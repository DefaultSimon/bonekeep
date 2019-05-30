// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';

import styles from './Card.scss';

type Props = {
  children: Node,
  className?: string | null
};

function Card(props: Props) {
  const { children, className, ...other } = props;
  const classes = classNames(styles.card, className);

  return (
    <span className={classes} {...other}>
      {children}
    </span>
  );
}

Card.defaultProps = {
  className: null
};

export default Card;
