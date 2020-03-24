import {fetch, post} from "./http";

export function addStudentClass(data) {
  return post('api/studentClass/add', data);
}

export function deleteStudentClass(data) {
  return fetch('api/studentClass/delete', data);
}
