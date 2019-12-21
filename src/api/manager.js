import {fetch, post} from "./http";

export function login(data) {
  return post('api/manager/login', data);
}

export function loginOut(data) {
  return post('api/manager/loginOut', data);
}

export function listManager(data) {
  return post('api/manager/list', data);
}

export function searchManager(data) {
  return post('api/manager/search', data);
}

export function addManager(data) {
  return post('api/manager/add', data);
}

export function updateManager(data) {
  return post('api/manager/update', data);
}

export function findManager(data) {
  return fetch('api/manager/detail', data);
}
