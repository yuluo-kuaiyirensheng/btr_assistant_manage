import {fetch, post} from "./http";

export function listStudent(data) {
  return post('api/student/list', data);
}

export function addStudent(data) {
  return post('api/student/add', data);
}

export function updateStudent(data) {
  return post('api/student/update', data);
}

export function findStudent(data) {
  return fetch('api/student/detail', data);
}
