import {fetch, post} from "./http";

export function listTeacher(data) {
  return post('api/teacher/list', data);
}

export function searchTeacher(data) {
  return post('api/teacher/search', data);
}
