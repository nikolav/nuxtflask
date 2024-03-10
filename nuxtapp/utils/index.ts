// @lodash
import lodash from "lodash";
const {
  reduce,
  filter,
  assign,
  at,
  capitalize,
  debounce,
  each,
  every,
  find,
  forEach,
  get,
  isEmpty,
  map,
  noop,
  now,
  omit,
  once,
  pick,
  pull,
  sample,
  set,
  size: len,
  some,
  transform,
  uniqueId,
  unset,
  zipObject,
} = lodash;
export {
  reduce,
  filter,
  once,
  sample,
  assign,
  at,
  debounce,
  each,
  every,
  find,
  forEach,
  get,
  len,
  map,
  noop,
  omit,
  pick,
  set,
  some,
  transform,
  unset,
  zipObject,
  now,
  capitalize,
  uniqueId,
  isEmpty,
  pull,
};

export * from "./re";
export { False } from "./fn-false";
export { has } from "./has";
export { stripSlashesEnd } from "./strip-slashes-end";
export { idGen } from "./id-gen";
export { setBatch as batchSet } from "./set-batch";
export { typeCore } from "./type-core";
export { isNumeric } from "./is-numeric";
export { docsSortedDesc } from "./docs-sorted-desc";
export { matchEmailStart } from "./match-email-start";
