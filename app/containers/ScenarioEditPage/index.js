/* eslint-disable react/prefer-stateless-function,no-underscore-dangle,camelcase,prefer-destructuring,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,no-restricted-syntax,no-await-in-loop */
/*
 *
 * ScenarioEditPage
 *
 * Page for editing scenario
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Pipeline from 'pipeline-builder';
import 'pipeline-builder/dist/pipeline.css';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';

import EditForm from '../EditForm';
import Button from '../../components/Button';
import Nav from '../LinkList/Nav';

import { configs, PHOTO_BONUS } from '../EditForm/configs';
import {
  emptyMessage,
  translateFromForm,
  translateToForm,
  onChangeOpenMessage,
  emptyFunc,
} from '../EditForm/create-form';
import requestAuth from '../../utils/requestAuth';

import messages from './messages';
import LoadingIndicator from '../../components/LoadingIndicator';
import { toDataURL } from '../../toBase64';
import { BASE64_RE } from '../../utils/utils';

import './react-contextmenu.css';
import { withAuthAdmin } from '../../utils/auth';
import MsgBox from '../../components/MsgBox';

const SCENARIO_NAME = 'Scenario';
const MENU_ID = 'scenario_menu';
const PIPELINE_ID = 'scenario_pipeline';

const urls = {
  get: id => `http://each.itsociety.su:4201/each/scenario/${id}`,
  update: 'http://each.itsociety.su:4201/each/scenario',
};

function addInWorkflow(workflow, data, input, output) {
  const inBind = input ? { bind: input } : {};
  const outBind = output ? { bind: output } : {};
  const step = new Pipeline.Step(data.desc.question, {
    i: { in: inBind },
    o: { out: outBind },
    data,
  });
  workflow.add(step);
  return step;
}

async function compareImages(fields, newImages, oldImages) {
  let i = 0;
  const len = fields.length;
  const cmp = [];
  while (i < len) {
    let img = oldImages[fields[i]];
    if (!BASE64_RE.test(img)) img = await toDataURL(oldImages[fields[i]]);
    if (img !== newImages[fields[i]]) cmp.push(fields[i]);
    i += 1;
  }
  return cmp;
}

const stepFields = {
  scenario: ['difficulty_bounty'],
  text_question: ['choices', 'correct', 'question', 'hint'],
  free_question: ['choices', 'question', 'hint'],
  location_question: ['location', 'question', 'range', 'hint'],
  ar_paint_question: ['question', 'hint'],
  video: ['uri'],
  text: ['text'],
};

function walkForward(conn, finish, callback) {
  let t = conn.to;
  while (
    t.step.name !== finish.step.name &&
    t.step.name !== conn.from.step.name
  ) {
    if (_.isFunction(callback)) callback(t);
    if (t.step.o.out.outputs.length > 0) t = t.step.o.out.outputs[0].to;
    else break;
  }
  return t;
}

function findChain(workflow) {
  const start = workflow.i.start;
  const finish = workflow.o.finish;
  if (start.outputs.length === 0 || finish.inputs.length === 0) return false;
  const contain = {};
  Object.keys(workflow.children).forEach(child => {
    contain[child] = false;
  });
  const conn = start.outputs[0];
  const t = walkForward(conn, finish, inPort => {
    contain[inPort.step.name] = true;
  });
  for (const child in contain) {
    if (!contain[child]) return false;
  }
  return t === finish;
}

function findLoopForward(conn, finish) {
  const t = walkForward(conn, finish);
  if (t.step.name === finish.step.name) return false;
  return t.step.name === conn.from.step.name;
}

const isScenario = name => name === SCENARIO_NAME;

const getType = select =>
  isScenario(select.name) ? 'scenario' : select.data.type;

const getBonus = select =>
  isScenario(select.name) ? select.data.final_bonus : select.data.desc.bonus;

function addImagesToArr(field, uri, arr) {
  arr.push({ field, res: uri.replace(BASE64_RE, '') });
}

function createNewSteps(inPort, newSteps, toAdd) {
  const { data } = inPort.step.action;
  newSteps.push(data);
  const base64 = [];
  configs[data.type].description.images.forEach(image => {
    if (data.desc[image.field].eid === 0)
      addImagesToArr(image.field, data.desc[image.field].uri, base64);
  });
  if (
    data.desc.bonus.type === PHOTO_BONUS &&
    BASE64_RE.test(data.desc.bonus.desc.image.uri)
  )
    addImagesToArr(PHOTO_BONUS, data.desc.bonus.desc.image.uri, base64);
  if (base64.length > 0) toAdd.push({ name: data.desc.question, base64 });
}

const getImageFieldFromResp = (images, i) => ({
  eid: images[i].eid,
  uri: `http://${images[i].uri}`,
});

export class ScenarioEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workflow: false,
      diagram: false,
      loading: true,
      error: false,
      select: false,
      openChange: false,
      openBonus: false,
      toDelete: [],
      enableSave: false,
      msgData: emptyMessage,
    };

    this._onContextMenu = this._onContextMenu.bind(this);
    this._init = this._init.bind(this);
    this._onAdd = this._onAdd.bind(this);
    this._onDelete = this._onDelete.bind(this);
    this._onUpdate = this._onUpdate.bind(this);
    this._onUpdateBonus = this._onUpdateBonus.bind(this);
    this._onSave = this._onSave.bind(this);
    this._endSave = this._endSave.bind(this);
    this._onChangeOpenMsg = this._onChangeOpenMsg.bind(this);
  }

  _onAdd(data) {
    const newData = data;
    newData.desc.bonus = { type: 'NONE', desc: {} };
    configs[data.type].description.images.forEach(image => {
      newData.desc[image.field] = {
        eid: 0,
        uri: newData.desc[image.field],
      };
    });
    addInWorkflow(this.state.workflow, newData, null, null);
    this.state.diagram.attachTo(this.state.workflow);
  }

  _init(data) {
    const scenario = JSON.parse(data[0].json);
    const workflow = new Pipeline.Workflow(SCENARIO_NAME, {
      o: { finish: {} },
      i: { start: {} },
      data: scenario,
    });
    if (scenario.step_count > 0) {
      let input = workflow.i.start;
      let s = null;
      let i = 0;
      for (; i < scenario.step_count; i += 1) {
        s = addInWorkflow(workflow, scenario.steps[i], input, null);
        input = s.o.out;
      }
      workflow.o.finish.bind(input);
    }
    const diagram = new Pipeline.Visualizer(
      document.getElementById(PIPELINE_ID),
    );
    diagram.attachTo(workflow);
    diagram._graph.on(
      'add',
      () => {
        if (!findChain(this.state.workflow))
          this.setState({ enableSave: false });
      },
      this,
    );
    diagram._graph.on(
      'remove',
      () => {
        this.setState({ enableSave: findChain(this.state.workflow) });
      },
      this,
    );
    diagram._graph.on(
      'change:target',
      target => {
        if (target.conn) {
          if (
            target.conn.from.outputs.length > 1 ||
            findLoopForward(target.conn, this.state.workflow.o.finish)
          )
            target.conn.unbind();
          else if (!this.state.enableSave && findChain(this.state.workflow))
            this.setState({ enableSave: true });
        }
      },
      this,
    );
    this.setState({
      workflow,
      diagram,
      loading: false,
      enableSave: true,
    });
  }

  componentDidMount() {
    requestAuth(urls.get(this.props.scenarioId))
      .then(data => this._init(data))
      .catch(err => this.setState({ error: err }));
  }

  _onDelete(name) {
    const step = this.state.workflow.children[name];
    const { data } = step.action;
    const { toDelete } = this.state;
    configs[data.type].description.images.forEach(image => {
      if (data.desc[image.field].eid !== 0)
        toDelete.push(data.desc[image.field].eid);
    });
    if (
      data.desc.bonus.type === PHOTO_BONUS &&
      data.desc.bonus.desc.image.eid !== 0
    )
      toDelete.push(data.desc.bonus.desc.image.eid);
    if (step.i.in.inputs.length > 0) step.i.in.inputs[0].unbind();
    if (step.o.out.outputs.length > 0) step.o.out.outputs[0].unbind();
    this.state.workflow.removeAction(name, true);
    this.state.diagram.attachTo(this.state.workflow);
    this.setState({ select: false });
  }

  _endSave(newSteps) {
    const scenario = this.state.workflow.actions[SCENARIO_NAME].data;
    scenario.steps = newSteps;
    scenario.step_count = newSteps.length;
    const body = {
      id: scenario.scenario_id,
      json: JSON.stringify(scenario),
      prop: { image: { add: [], delete: this.state.toDelete } },
    };
    const options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    this.setState({ toDelete: [] });
    requestAuth(urls.update, options)
      .then(() =>
        this._onChangeOpenMsg(
          messages.success,
          false,
          this._onChangeOpenMsg,
          emptyFunc,
        ),
      )
      .catch(() =>
        this._onChangeOpenMsg(
          messages.failure,
          false,
          this._onChangeOpenMsg,
          emptyFunc,
        ),
      );
  }

  _onSave() {
    if (!this.state.enableSave) return;
    const toAdd = [];
    const scenario = this.state.workflow.actions[SCENARIO_NAME].data;
    const newSteps = [];
    if (
      scenario.final_bonus.type === PHOTO_BONUS &&
      BASE64_RE.test(scenario.final_bonus.desc.image.uri)
    )
      toAdd.push({
        name: SCENARIO_NAME,
        base64: [
          {
            field: 'final_bonus',
            res: scenario.final_bonus.desc.image.uri.replace(BASE64_RE, ''),
          },
        ],
      });
    const t = walkForward(
      this.state.workflow.i.start.outputs[0],
      this.state.workflow.o.finish,
      inPort => createNewSteps(inPort, newSteps, toAdd),
    );
    if (t !== this.state.workflow.o.finish) {
      this.setState({ enableSave: false });
      return;
    }
    if (toAdd.length === 0) this._endSave(newSteps);
    else {
      const add = [];
      toAdd.forEach(step => {
        step.base64.forEach(base64 => {
          add.push(base64.res);
        });
      });
      const body = {
        id: scenario.scenario_id,
        prop: { image: { add, delete: [] } },
      };
      const options = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      requestAuth(urls.update, options)
        .then(res => {
          const images = res[0].image;
          let i = 0;
          if (isScenario(toAdd[0].name)) {
            scenario.final_bonus.desc.image = getImageFieldFromResp(images, 0);
            i = 1;
          }
          let k = 0;
          const changeImage = (image, name) => {
            while (k < newSteps.length && newSteps[k].desc.question !== name)
              k += 1;
            if (image.field === 'bonus')
              newSteps[k].desc.bonus.desc.image = getImageFieldFromResp(
                images,
                i,
              );
            else
              newSteps[k].desc[image.field] = getImageFieldFromResp(images, i);
            i += 1;
          };
          for (let j = i; j < toAdd.length; j += 1) {
            toAdd[j].base64.forEach(im => changeImage(im, toAdd[j].name));
          }
          this._endSave(newSteps);
        })
        .catch(() =>
          this._onChangeOpenMsg(
            messages.failure,
            false,
            this._onChangeOpenMsg,
            emptyFunc,
          ),
        );
    }
  }

  _onUpdate(name, form) {
    const step = this.state.workflow.actions[name];
    const { data } = step;
    if (isScenario(name)) {
      stepFields.scenario.forEach(field => {
        data[field] = form[field];
      });
    } else {
      const newImages = {};
      const oldImages = {};
      const fields = [];
      configs[data.type].description.images.forEach(image => {
        newImages[image.field] = form[image.field];
        oldImages[image.field] = data.desc[image.field].uri;
        fields.push(image.field);
      });
      if (form.question !== name) {
        this.state.workflow.children[name].rename(form.question);
        this.state.diagram.attachTo(this.state.workflow);
      }
      stepFields[data.type].forEach(field => {
        data.desc[field] = form[field];
      });
      compareImages(fields, newImages, oldImages).then(cmp => {
        const { toDelete } = this.state;
        cmp.forEach(field => {
          if (data.desc[field].eid !== 0) {
            toDelete.push(data.desc[field].eid);
            data.desc[field].eid = 0;
          }
          data.desc[field].uri = form[field];
        });
      });
    }
  }

  _onUpdateBonus(name, form) {
    const step = this.state.workflow.actions[name];
    const { data } = step;
    let bonus = getBonus(step);
    if (bonus.type === PHOTO_BONUS && bonus.desc.image.eid !== 0)
      this.state.toDelete.push(bonus.desc.image.eid);
    if (form.type !== PHOTO_BONUS) {
      bonus = JSON.parse(JSON.stringify(form));
    } else {
      bonus = {
        type: PHOTO_BONUS,
        desc: { image: { eid: 0, uri: form.desc.uri } },
      };
    }
    if (isScenario(name)) {
      data.final_bonus = bonus;
    } else {
      data.desc.bonus = bonus;
    }
  }

  _onContextMenu(evt, data) {
    const { workflow, diagram, loading, error, select } = this.state;
    if (workflow && diagram.selection.length === 1 && !loading && !error) {
      if (data.action === 'Change') {
        this.setState({
          openChange: true,
        });
      } else if (data.action === 'ChangeBonus') {
        this.setState({
          openBonus: true,
        });
      } else if (data.action === 'Delete' && !isScenario(select.name)) {
        this._onDelete(select.name);
      }
    }
  }

  _onChangeOpenMsg(message, cancel, onSubmit, onClose) {
    onChangeOpenMessage(message, cancel, onSubmit, onClose, this);
  }

  render() {
    const { scenario_step } = configs;
    const {
      loading,
      error,
      diagram,
      select,
      openChange,
      openBonus,
      enableSave,
      msgData,
    } = this.state;
    if (error) return <div>Something went wrong</div>;
    return (
      <div style={{ padding: '0 1em' }}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <div>
            <EditForm
              flexDirection="column"
              isPlaceholder={false}
              trigger={
                <Nav>
                  <Button>
                    <FormattedMessage {...messages.scenario_step.add} />
                  </Button>
                </Nav>
              }
              item={translateToForm.scenario_step(scenario_step.empty)}
              isPopup
              settings={scenario_step}
              onSubmit={form =>
                this._onAdd(translateFromForm.scenario_step(form))
              }
            />
            <Nav>
              <Button disabled={!enableSave} onClick={this._onSave}>
                <FormattedMessage {...messages.save} />
              </Button>
            </Nav>
          </div>
        )}
        {select && (
          <EditForm
            flexDirection="column"
            isPlaceholder={false}
            open={openChange}
            onClose={() => this.setState({ openChange: false })}
            item={translateToForm[getType(select)](select.data)}
            isPopup
            settings={configs[getType(select)]}
            onSubmit={form =>
              this._onUpdate(
                select.name,
                translateFromForm[getType(select)](form),
              )
            }
          />
        )}
        {select && (
          <EditForm
            flexDirection="column"
            isPlaceholder={false}
            open={openBonus}
            onClose={() => this.setState({ openBonus: false })}
            item={translateToForm.bonus(getBonus(select))}
            isPopup
            settings={configs.bonus}
            onSubmit={form =>
              this._onUpdateBonus(select.name, translateFromForm.bonus(form))
            }
          />
        )}
        <ContextMenuTrigger id={MENU_ID} holdToDisplay={1000}>
          <div
            style={{ height: '700px' }}
            id={PIPELINE_ID}
            onClick={() => {
              if (diagram.selection.length > 0)
                this.setState({ select: diagram.selection[0].step.action });
              else if (select) this.setState({ select: false });
            }}
          />
        </ContextMenuTrigger>
        {select && (
          <ContextMenu id={MENU_ID}>
            <MenuItem onClick={this._onContextMenu} data={{ action: 'Change' }}>
              Change
            </MenuItem>
            <MenuItem
              onClick={this._onContextMenu}
              data={{ action: 'ChangeBonus' }}
            >
              Change Bonus
            </MenuItem>
            {!isScenario(select.name) && (
              <MenuItem
                onClick={this._onContextMenu}
                data={{ action: 'Delete' }}
              >
                Delete
              </MenuItem>
            )}
          </ContextMenu>
        )}
        <MsgBox
          message={msgData.message}
          open={msgData.isOpenMsg}
          onSubmit={msgData.onSubmit}
          cancel={msgData.isCancelMsg}
          onClose={msgData.onClose}
        />
      </div>
    );
  }
}

ScenarioEditPage.propTypes = { scenarioId: PropTypes.string };

export default withAuthAdmin(ScenarioEditPage);
