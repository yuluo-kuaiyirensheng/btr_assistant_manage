import {fetch, post} from "./http";

export function listClassType(data) {
  return fetch('api/category/list', data);
}
