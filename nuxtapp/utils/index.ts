// @lodash
import lodash from "lodash";
const {
  pull,
  isEmpty,
  capitalize,
  once,
  sample,
  assign,
  at,
  debounce,
  each,
  every,
  uniqueId,
  now,
  find,
  forEach,
  get,
  map,
  noop,
  omit,
  pick,
  set,
  size: len,
  some,
  transform,
  unset,
  zipObject,
} = lodash;
export {
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
