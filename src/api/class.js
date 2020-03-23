import {fetch, post} from "./http";

export function listClass(data) {
  return post('api/class/list', data);
}

export function addClass(data) {
  return post('api/class/add', data);
}

export function updateClass(data) {
  return post('api/class/update', data);
}

export function findClass(data) {
  return fetch('api/class/detail', data);
}

export function validateClassNo(data) {
  return fetch('api/class/validate/classNo', data);
}
