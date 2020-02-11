import { gte } from 'ember-compatibility-helpers';
import { tracked } from '@glimmer/tracking';
import {
  DEFAULT_STATE as INITIAL_TASK_STATE
} from "./external/task/default-state";
import {
  INITIAL_STATE as INITIAL_INSTANCE_STATE
} from "./external/task-instance/initial-state";

const USE_TRACKED = gte('3.15.0');

function trackMixin(obj, pair) {
  const [key, value] = pair;
  obj[key] = tracked(value);
  return obj;
}

export let TRACKED_INITIAL_TASK_STATE;
export let TRACKED_INITIAL_INSTANCE_STATE;

if (USE_TRACKED) {
  TRACKED_INITIAL_TASK_STATE = Object.entries(INITIAL_TASK_STATE).reduce(trackMixin, {
    numRunning: tracked(0),
    numQueued: tracked(0),
    isRunning: tracked(false),
    isQueued: tracked(false),
    isIdle: tracked(true),
  });

  TRACKED_INITIAL_INSTANCE_STATE = Object.entries(INITIAL_INSTANCE_STATE).reduce(trackMixin, {
    state: tracked('waiting'),
    isDropped: tracked(false),
    isRunning: tracked(true),
  });

  Object.freeze(TRACKED_INITIAL_TASK_STATE);
  Object.freeze(TRACKED_INITIAL_INSTANCE_STATE);
}
