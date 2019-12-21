import {fetch, post} from "./http";

export function listInstitution(data) {
  return post('api/institution/list', data);
}

export function searchInstitution(data) {
  return post('api/institution/search', data);
}

export function addInstitution(data) {
  return post('api/institution/add', data);
}

export function updateInstitution(data) {
  return post('api/institution/update', data);
}

export function findInstitution(data) {
  return fetch('api/institution/detail', data);
}
