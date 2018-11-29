import axios from 'axios';

const ERROR_OK = 0;

// 对axios的get做进一步封装
export function get(url) {
  return function(params) {
    return axios.get(url, {
      params
    }).then(res => {
      let { errno, data } = res.data;
      if (errno === ERROR_OK) {
        return data;
      }
    }).catch(() => {
    });
  };
}
