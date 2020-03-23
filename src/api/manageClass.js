import {fetch, post} from "./http";

export function addManageClass(data) {
  return post('api/manageClass/add', data);
}

export function delManageClass(data) {
  return fetch('api/manageClass/delete', data);
}
