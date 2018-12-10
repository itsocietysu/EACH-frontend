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
import _ from 'lodash';
import 'rc-select/assets/index.css';
import '../SelectSearch/index.css';

class SelectTag extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onDeselect = this.onDeselect.bind(this);
  }

  onChange = currentValue => {
    if (currentValue.length <= this.props.max_tags)
      this.props.onChange(currentValue);
  };

  onDeselect = value => {
    if (_.isFunction(this.props.onDeselect)) this.props.onDeselect(value);
  };

  render() {
    return (
      <Select
        tags
        value={this.props.value}
        placeholder=""
        onChange={this.onChange}
        tokenSeparators={[';']}
        onDeselect={this.onDeselect}
      />
    );
  }
}

SelectTag.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
  onDeselect: PropTypes.func,
  max_tags: PropTypes.number,
};

export default SelectTag;
