/* eslint-disable camelcase,no-underscore-dangle */
import React from 'react';
import lodash from 'lodash';

import Form from './form';
import DependForm from './depend-form';
import messages from './messages';

export const emptyFunc = () => {};

export const emptyMessage = {
  isOpenMsg: false,
  message: {},
  isCancelMsg: false,
  onSubmit: emptyFunc,
  onClose: emptyFunc,
};

export const translateToForm = {
  museum: item => ({ museum: item }),
  feed: item => ({ feed: item }),
  location: item => ({ location: item }),
  quest: item => ({ quest: item }),
  bonus: item => {
    const res = { bonus: { select: item.type } };
    switch (item.type) {
      case 'video':
        res.bonus.video = { url: item.desc.uri };
        break;
      case 'photo':
        if (item.desc.image.uri.includes('data:image/jpeg;base64,'))
          res.bonus.photo = {
            select: 'image',
            image: { image: item.desc.image.uri },
          };
        else
          res.bonus.photo = {
            select: 'uri',
            uri: { url: item.desc.image.uri },
          };
        break;
      case 'text':
        res.bonus.text = { text: item.desc.text };
        break;
      default:
        res.bonus.select = '';
        break;
    }
    return res;
  },
  text_question: item => {
    const res = {};
    res.avatar = item.desc.avatar.uri;
    res.question = item.desc.question;
    res.choices = item.desc.choices;
    res.correct = item.desc.choices[item.desc.correct];
    res.hint = item.desc.hint;
    return { text_question: res };
  },
  free_question: item => {
    const res = {};
    res.avatar = item.desc.avatar.uri;
    res.question = item.desc.question;
    res.choices = item.desc.choices;
    res.hint = item.desc.hint;
    return { free_question: res };
  },
  location_question: item => {
    const res = {};
    res.avatar = item.desc.avatar.uri;
    res.question = item.desc.question;
    res.latitude = item.desc.location.lat;
    res.longitude = item.desc.location.lon;
    res.range = item.desc.range;
    res.hint = item.desc.hint;
    return { location_question: res };
  },
  ar_paint_question: item => {
    const res = {};
    res.avatar = item.desc.avatar.uri;
    res.target = item.desc.target.uri;
    res.question = item.desc.question;
    res.hint = item.desc.hint;
    return { ar_paint_question: res };
  },
  scenario_step: item => ({ scenario_step: { select: item.select } }),
  scenario: item => ({
    scenario: { difficulty_bounty: item.difficulty_bounty },
  }),
};

const from_text_question = item => {
  const res = item.text_question;
  res.correct = item.text_question.choices.indexOf(item.text_question.correct);
  return res;
};

const from_free_question = item => item.free_question;

const from_location_question = item => {
  const keys = Object.keys(item.location_question);
  const res = {};
  keys.forEach(key => {
    if (key !== 'latitude' && key !== 'longitude')
      res[key] = item.location_question[key];
  });
  res.location = {
    lat: item.location_question.latitude,
    lon: item.location_question.longitude,
  };
  return res;
};

const from_ar_paint_question = item => item.ar_paint_question;

export const translateFromForm = {
  museum: item => item.museum,
  feed: item => item.feed,
  location: item => item.location,
  quest: item => item.quest,
  bonus: item => {
    const res = { type: item.bonus.select, desc: {} };
    switch (item.bonus.select) {
      case 'video':
        res.desc.uri = item.bonus.video.url;
        break;
      case 'photo':
        switch (item.bonus.photo.select) {
          case 'uri':
            res.desc.uri = item.bonus.photo.uri.url;
            break;
          case 'image':
            res.desc.uri = item.bonus.photo.image.image;
            break;
          default:
            res.type = 'NONE';
            res.uri = 'none';
            break;
        }
        break;
      case 'text':
        res.desc.text = item.bonus.text.text;
        break;
      default:
        res.type = 'NONE';
        res.uri = 'none';
        break;
    }
    return res;
  },
  text_question: from_text_question,
  free_question: from_free_question,
  location_question: from_location_question,
  ar_paint_question: from_ar_paint_question,
  scenario_step: item => {
    const res = { type: item.scenario_step.select, desc: {} };
    switch (item.scenario_step.select) {
      case 'text_question':
        res.desc = from_text_question(item.scenario_step);
        break;
      case 'free_question':
        res.desc = from_free_question(item.scenario_step);
        break;
      case 'location_question':
        res.desc = from_location_question(item.scenario_step);
        break;
      case 'ar_paint_question':
        res.desc = item.scenario_step.ar_paint_question;
        break;
      default:
        break;
    }
    return res;
  },
  scenario: item => item.scenario,
};

export function createForm(item, settings, ref) {
  if (settings.type === 'form')
    return (
      <Form
        item={item[settings.name] || settings.empty}
        settings={settings}
        ref={ref}
      />
    );
  else if (settings.type === 'depend-form')
    return (
      <DependForm
        item={item[settings.name] || settings.empty}
        settings={settings}
        ref={ref}
      />
    );
  return null;
}

export function onChangeOpenMessage(message, cancel, onSubmit, onClose, form) {
  const { state } = form;
  state.msgData = {
    isOpenMsg: !state.msgData.isOpenMsg,
    message,
    isCancelMsg: cancel,
    onSubmit,
    onClose,
  };
  form.setState(state);
}

export function onCloseForm(close, form) {
  form._onChangeOpenMsg(
    messages.sure,
    true,
    () => {
      if (lodash.isFunction(close)) close();
    },
    form._onChangeOpenMsg,
  );
}

export function onEmptyForm(form) {
  form._onChangeOpenMsg(
    messages.empty,
    false,
    emptyFunc,
    form._onChangeOpenMsg,
  );
}
