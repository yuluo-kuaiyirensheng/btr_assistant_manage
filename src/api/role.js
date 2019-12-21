import {fetch, post} from "./http";

export function listRole(data) {
  return post('api/role/list', data);
}

export function findRole(data) {
  return fetch('api/role/detail', data);
}
