import {fetch, post} from "./http";

export function listProvince(data) {
  return fetch('api/region/list', data);
}

export function listCity(data) {
  return fetch('api/region/list/city', data);
}

export function listArea(data) {
  return fetch('api/region/list/area', data);
}

export function searchRegion(data) {
  return fetch('api/region/list/search', data);
}
