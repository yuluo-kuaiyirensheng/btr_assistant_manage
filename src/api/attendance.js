import {fetch, post} from "./http";

export function updateAttendance(data) {
  return post('api/attendance/update', data);
}
