import set from "lodash/set";
import transform from "lodash/transform";

export const setBatch = <T = any>(object: T, config: Record<string, any>) =>
  transform(config, 
    (accum, value, path) => { set(accum, path, value); },
    JSON.parse(JSON.stringify(object)));
