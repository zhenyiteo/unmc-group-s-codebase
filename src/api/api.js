import http from "./http";

export function query() {
  return http.jsonGet("/item", {})
}
export function get(id) {
  return http.jsonGet("/item/" + id, {})
}


export function add(params) {
  return http.jsonPost("/item", params)
}
export function update(id, params) {
  return http.jsonUpdate("/item/" + id, params)
}

export function del(id) {
  return http.jsonDelete("/item/" + id)
}
