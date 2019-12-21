import {fetch, post} from "./http";

export function listStudent(data) {
  return post('api/student/list', data);
}

export function searchStudent(data) {
  return post('api/student/search', data);
}
