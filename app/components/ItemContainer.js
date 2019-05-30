// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';

type Props = {
  children: Node,
  className?: string | null,
  bgColor?: string | null
};

/**
 * General-purpose (stateless) component
 */
function ItemContainer(props: Props) {
  const { children, className, bgColor, ...other } = props;
  const classes = classNames(
    className,
    bgColor ? `bg-${bgColor.toString()}` : null
  );

  return (
    <span className={classes} {...other}>
      {children}
    </span>
  );
}

ItemContainer.defaultProps = {
  className: null,
  bgColor: null
};

export default ItemContainer;
