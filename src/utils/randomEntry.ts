import { random } from 'lodash';

export const randomEntry = <T>(entries: T[]): T => {
  if (!entries.length) {
    return null as T;
  }

  const max = entries.length - 1;

  return entries[random(0, max, false)];
};
