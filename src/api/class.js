import {fetch, post} from "./http";

export function listClass(data) {
  return post('api/class/list', data);
}

export function searchClass(data) {
  return post('api/class/search', data);
}
