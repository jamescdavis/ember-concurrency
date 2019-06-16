import { or, bool } from '@ember/object/computed';
import EmberObject from '@ember/object';
import { objectAssign, _ComputedProperty, makeGuid } from './utils';
import TaskStateMixin from './-task-state-mixin';
import { propertyModifiers } from './-property-modifiers-mixin';
import { gte } from 'ember-compatibility-helpers';

export const TaskGroup = EmberObject.extend(TaskStateMixin, {
  init() {
    this._super(...arguments);
    this._guid = makeGuid();
  },

  toString() {
    return `<TaskGroup:${this._propertyName}>`;
  },

  _numRunningOrNumQueued: or('numRunning', 'numQueued'),

  // TODO: audit these
  isRunning: bool('_numRunningOrNumQueued'),
  isQueued: false,
});

export let TaskGroupProperty;

if (gte('3.10.0-alpha.1')) {
  TaskGroupProperty = class {};
} else {
  TaskGroupProperty = class extends _ComputedProperty {};
}

objectAssign(TaskGroupProperty.prototype, propertyModifiers);
