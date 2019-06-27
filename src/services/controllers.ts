import { VenueSong } from '../models';

export function toCapitalCase (namespace: string) {
  return namespace.slice(1, 2).toUpperCase() + namespace.slice(2);
};
