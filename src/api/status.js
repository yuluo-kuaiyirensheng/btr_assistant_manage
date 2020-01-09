import {fetch, post} from "./http";

export function addStatus(data) {
  return post('api/status/add', data);
}

export function updateStatus(data) {
  return post('api/status/update', data);
}

export function listStatus(data) {
  return post('api/status/list', data);
}
