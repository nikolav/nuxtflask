const has_ = Function.prototype.call.bind(Object.prototype.hasOwnProperty);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const has = <TObject = any>(node: TObject, key: any): boolean =>
  has_(Object(node), key);
