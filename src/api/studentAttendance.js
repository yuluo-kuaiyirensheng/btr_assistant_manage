import {fetch, post} from "./http";

export function listStudentAttendance(data) {
  return post('api/studentAttendance/list', data);
}

export function searchStudentAttendance(data) {
  return post('api/studentAttendance/search', data);
}
