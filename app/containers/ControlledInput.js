// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ControlledInput extends Component {
  constructor(props) {
    super(props);

    const { onChangeCallback } = this.props;
    this.onChangeCallback = onChangeCallback;

    this.state = {
      value: ''
    };
  }

  /**
   * Catch changes, pass them onto the callback and set the result as the value.
   */
  handleChange = (event: Event): void => {
    const { value } = event.target;
    const callbackResult = this.onChangeCallback(value);

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
    const { type, onChangeCallback, ...other } = this.props;
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

ControlledInput.propTypes = {
  type: PropTypes.string,
  onChangeCallback: PropTypes.func.isRequired
};
ControlledInput.defaultProps = {
  type: 'text'
};

export default ControlledInput;
