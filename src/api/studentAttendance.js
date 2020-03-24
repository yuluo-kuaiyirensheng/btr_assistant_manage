import {fetch, post} from "./http";

export function listStudentAttendance(data) {
  return post('api/studentAttendance/list', data);
}

export function addStudentAttendance(data) {
  return post('api/studentAttendance/add', data);
}

export function updateStudentAttendance(data) {
  return post('api/studentAttendance/update', data);
}

export function findStudentAttendance(data) {
  return fetch('api/studentAttendance/detail', data);
}
