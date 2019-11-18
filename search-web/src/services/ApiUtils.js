import request from '../utils/request';
import qs from 'qs';

const baseUrl = "/search/";

export function get(url , params) {
  let p = params ? '?'+ qs.stringify(params) : '';
  return request(baseUrl + url+p, {
    method: 'GET',
    headers : {  
        'Authorization': 'Bearer ' + localStorage.getItem('tz_token')
    } 
  });
}
export function post(url, params) {
  return request( baseUrl + url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers : {  
        'Content-Type' : 'application/json',  
        'Authorization': 'Bearer ' + localStorage.getItem('tz_token')
    } 
  });
};

export function put(url , params) {
  return request( baseUrl + url, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers : {  
        'Content-Type' : 'application/json',  
        'Authorization': 'Bearer ' + localStorage.getItem('tz_token')
    } 
  });
};

export function deleteData(url , params) {
  let p = params ? '?'+ qs.stringify(params) : '';
  return request( baseUrl + url+p, {
    method: 'DELETE',
    headers : {  
        'Content-Type' : 'application/json',  
        'Authorization': 'Bearer ' + localStorage.getItem('tz_token')
    } 
  });
};
