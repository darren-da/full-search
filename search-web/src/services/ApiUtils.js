import request from '../utils/request';
import qs from 'qs';

export function get(url , params) {
  let p = params ? '?'+ qs.stringify(params) : '';
  return request(url+p, {
    method: 'GET',
    // headers : {  
    //     'Authorization': 'Bearer ' + localStorage.getItem('dms_token')
    // } 
  });
}
export function post(url, params) {
  return request( url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers : {  
        'Content-Type' : 'application/json',  
        // 'Authorization': 'Bearer ' + localStorage.getItem('dms_token')
    } 
  });
};

export function put(url , params) {
  return request( url, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers : {  
        'Content-Type' : 'application/json',  
        // 'Authorization': 'Bearer ' + localStorage.getItem('dms_token')
    } 
  });
};

export function deleteData(url , params) {
  let p = params ? '?'+ qs.stringify(params) : '';
  return request( url+p, {
    method: 'DELETE',
    // headers : {  
    //     'Content-Type' : 'application/json',  
    //     // 'Authorization': 'Bearer ' + localStorage.getItem('dms_token')
    // } 
  });
};
