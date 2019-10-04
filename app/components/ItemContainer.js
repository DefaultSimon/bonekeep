// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';

type Props = {
  children: Node,
  className?: string | null,
  bgColor?: string | null,
  component?: string | Node
};

/**
 * General-purpose (stateless) component
 */
function ItemContainer(props: Props) {
  const { children, className, bgColor, component, ...other } = props;
  const classes = classNames(
    className,
    bgColor ? `bg-${bgColor.toString()}` : null
  );
  const CustomComponent = component;

  return (
    <CustomComponent className={classes} {...other}>
      {children}
    </CustomComponent>
  );
}

ItemContainer.defaultProps = {
  className: null,
  bgColor: null,
  component: 'div'
};

export default ItemContainer;
