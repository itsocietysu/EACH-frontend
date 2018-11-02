/* eslint-disable react/prefer-stateless-function,no-restricted-syntax,no-unused-expressions,react/no-children-prop,no-underscore-dangle */
/*
 *
 * Component with depend-form for editing
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

import SelectSimple from '../SelectSimple';
import { createForm } from './create-form';

class DependForm extends React.Component {
  constructor(props) {
    super(props);
    const { item, settings } = props;
    let formData;
    if (item) formData = JSON.parse(JSON.stringify(item));
    else formData = JSON.parse(JSON.stringify(settings.empty));
    this.state = {
      name: props.settings.name,
      formData,
      children: {},
      refChildren: {},
      values: [],
    };

    this._init = this._init.bind(this);
    this._onChangeSelect = this._onChangeSelect.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    this._init();
  }

  _init() {
    const { item, settings } = this.props;
    const { description } = settings;
    const { state } = this;
    description.selects.forEach(select => {
      state.refChildren[select.name] = React.createRef();
      state.children[select.name] = createForm(
        item,
        select,
        state.refChildren[select.name],
      );
      state.values.push(select.name);
    });
  }

  _onChangeSelect(evt) {
    this.state.formData.select = evt.target.value;
    this.setState(this.state);
  }

  _onSubmit() {
    const { formData, refChildren } = this.state;
    const { settings } = this.props;
    const dataToPost = {};
    if (!formData.select) return null;
    const child = refChildren[formData.select].current._onSubmit();
    if (child === null) return null;
    dataToPost[settings.name] = Object.assign(
      JSON.parse(JSON.stringify(formData)),
      child,
    );
    return dataToPost;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.name !== this.props.settings.name) this._init();
  }

  render() {
    const { settings } = this.props;
    const { name } = settings;
    const { values, children } = this.state;
    let data = this.state.formData;
    if (name !== this.state.name) {
      this.state.name = name;
      data = {};
    }
    if (Object.keys(data).length === 0) data = this.props.item;
    const Content = data.select ? () => children[data.select] : () => <div />;
    return (
      <div>
        <SelectSimple
          value={data.select}
          values={values}
          onChange={value => this.setState({ formData: { select: value } })}
        />
        <Content />
      </div>
    );
  }
}

DependForm.propTypes = {
  item: PropTypes.object,
  settings: PropTypes.object,
};

export default DependForm;
