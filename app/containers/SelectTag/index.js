/*
 *
 * SelectTag
 *
 * This component is select for tags
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'rc-select';
import 'rc-select/assets/index.css';
import '../SelectSearch/index.css';

class SelectTag extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange = currentValue => {
    this.props.onChange(currentValue);
  };

  render() {
    return (
      <Select
        tags
        value={this.props.value}
        placeholder=""
        onChange={this.onChange}
        tokenSeparators={[' ', ',']}
      />
    );
  }
}

SelectTag.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
};

export default SelectTag;
