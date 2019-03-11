/*
 *
 * SelectSimple
 *
 * This component is simple select
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
import '../SelectSearch/index.css';

class SelectSimple extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange = currentValue => {
    this.props.onChange(currentValue);
  };

  render() {
    const options = this.props.values.map(d => (
      <Option key={d}>
        <i>{d}</i>
      </Option>
    ));
    return (
      <Select value={this.props.value} placeholder="" onChange={this.onChange}>
        {options}
      </Select>
    );
  }
}

SelectSimple.propTypes = {
  value: PropTypes.string,
  values: PropTypes.array,
  onChange: PropTypes.func,
};

export default SelectSimple;
