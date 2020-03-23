import {fetch, post} from "./http";

export function listTeacher(data) {
  return post('api/teacher/list', data);
}

export function addTeacher(data) {
  return post('api/teacher/add', data);
}

export function updateTeacher(data) {
  return post('api/teacher/update', data);
}

export function findTeacher(data) {
  return fetch('api/teacher/detail', data);
}
