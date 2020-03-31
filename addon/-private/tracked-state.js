import { gte } from 'ember-compatibility-helpers';
import { tracked } from '@glimmer/tracking';
import {
  DEFAULT_STATE as INITIAL_TASK_STATE
} from "./external/task/default-state";
import {
  INITIAL_STATE as INITIAL_INSTANCE_STATE
} from "./external/task-instance/initial-state";

const USE_TRACKED = gte('3.16.0');

function trackMixin(obj, pair) {
  const [key, value] = pair;
  obj[key] = tracked({ value });
  return obj;
}

export let TRACKED_INITIAL_TASK_STATE;
export let TRACKED_INITIAL_INSTANCE_STATE;

if (USE_TRACKED) {
  TRACKED_INITIAL_TASK_STATE = Object.entries(INITIAL_TASK_STATE).reduce(trackMixin, {
    numRunning: tracked({ value: 0 }),
    numQueued: tracked({ value: 0 }),
    isRunning: tracked({ value: false }),
    isQueued: tracked({ value: false }),
    isIdle: tracked({ value: true }),
  });

  TRACKED_INITIAL_INSTANCE_STATE = Object.entries(INITIAL_INSTANCE_STATE).reduce(trackMixin, {
    state: tracked({ value: 'waiting' }),
    isDropped: tracked({ value: false }),
    isRunning: tracked({ value: true }),
  });

  Object.freeze(TRACKED_INITIAL_TASK_STATE);
  Object.freeze(TRACKED_INITIAL_INSTANCE_STATE);
}
