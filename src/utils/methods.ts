export const isEmpty = (obj: Record<string, unknown>): boolean =>
  Object.keys(obj).length === 0;
