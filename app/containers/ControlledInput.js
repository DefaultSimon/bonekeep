// @flow
import React, { Component } from 'react';

type Props = {
  type?: string,
  onChange: (value: string) => void
};

type State = {
  value: string
};

class ControlledInput extends Component<Props, State> {
  onChange: (value: string) => void;

  props: Props;

  static defaultProps = {
    type: 'text'
  };

  constructor(props: Props) {
    super(props);

    const { onChange } = this.props;
    this.onChange = onChange;
  }

  state = {
    value: ''
  };

  /**
   * Catch changes, pass them onto the callback and set the result as the value.
   */
  handleChange = (event: SyntheticInputEvent<*>): void => {
    const { value } = event.target;
    const callbackResult = this.onChange(value);

    this.setState({ value: callbackResult });
  };

  /**
   * Return the current input value
   * @returns {string}
   */
  getCurrentValue = (): string => {
    // eslint-disable-next-line react/destructuring-assignment
    return this.state.value;
  };

  render() {
    const { type, onChange, ...other } = this.props;
    const { value } = this.state;

    return (
      <input
        type={type}
        {...other}
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}

export default ControlledInput;
