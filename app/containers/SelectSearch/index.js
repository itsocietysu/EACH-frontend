/*
 *
 * SelectSearch
 *
 * This component is select with fetch request to the server to get suggested data
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
import './index.css';

class SelectSearch extends React.Component {
  state = {
    dataFromServer: [],
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  onChange = currentValue => {
    const arr = currentValue.map(value => {
      const o = {
        eid: value.key,
      };
      o[this.props.renderField] = value.label.props.children;
      return o;
    });
    this.props.onChange(arr);
  };

  fetchData = value => {
    if (value !== '') {
      this.props
        .requestFunc(value)
        .then(dataFromServer => {
          this.setState({
            dataFromServer,
          });
        })
        .catch(() =>
          this.setState({
            dataFromServer: [],
          }),
        );
    }
  };

  render() {
    const { dataFromServer } = this.state;
    const { renderField, values } = this.props;
    const options = dataFromServer.map(d => (
      <Option key={d.eid}>
        <i>{d[renderField]}</i>
      </Option>
    ));
    const currentValue = values.map(value => ({
      key: value.eid,
      label: <i>{value[renderField]}</i>,
    }));
    return (
      <Select
        value={currentValue}
        labelInValue
        animation="slide-up"
        placeholder=""
        optionLabelProp="children"
        multiple
        notFoundContent=""
        onSearch={this.fetchData}
        onChange={this.onChange}
        filterOption={false}
      >
        {options}
      </Select>
    );
  }
}

SelectSearch.propTypes = {
  requestFunc: PropTypes.func,
  renderField: PropTypes.string,
  values: PropTypes.array,
  onChange: PropTypes.func,
};

export default SelectSearch;
