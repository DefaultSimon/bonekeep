import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

type Props = {
  className: ?string,
  label: ?string
};

/**
 * A self-contained Material-UI TextField wrapper
 * Assign a ref on the parent and call getCurrentValue to get input's value
 */
class BonekeepTextField extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  getCurrentValue = () => {
    // eslint-disable-next-line react/destructuring-assignment
    return this.state.value;
  };

  updateCurrentValue = (value: string) => {
    this.setState(() => ({
      value
    }));
  };

  render() {
    const { className, label, ...other } = this.props;
    const { value } = this.state;

    return (
      <TextField
        className={className}
        label={label}
        value={value}
        onChange={e => this.updateCurrentValue(e.target.value)}
        {...other}
      />
    );
  }
}

export default BonekeepTextField;
