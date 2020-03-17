import {fetch, post} from "./http";

export function listInstitution(data) {
  return post('api/institution/list', data);
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

export function validateInsName(data) {
  return post('api/institution/validate/insName', data);
}

export function generatePass(data) {
  return fetch('api/institution/generate/pass', data);
}
