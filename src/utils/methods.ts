export const isEmpty = (obj: Record<string, unknown>): boolean =>
  Object.keys(obj).length === 0;

export const isUndefined = (value: unknown): value is undefined =>
  value === undefined;
