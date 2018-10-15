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
    currentValue: [],
    fUpd: false,
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
    this.setState({
      currentValue,
    });
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

  componentDidUpdate() {
    if (!this.state.fUpd) {
      this.state.currentValue = this.props.initValue.map(value => ({
        key: value.key,
        label: <i>{value.field}</i>,
      }));
      this.state.fUpd = true;
    }
  }

  render() {
    const { dataFromServer, currentValue } = this.state;
    const { renderField } = this.props;
    const options = dataFromServer.map(d => (
      <Option key={d.eid}>
        <i>{d[renderField]}</i>
      </Option>
    ));
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
  initValue: PropTypes.array,
  onChange: PropTypes.func,
};

export default SelectSearch;
