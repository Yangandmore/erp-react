import frequest from './request';
import config from '../../config';
import { setToken, getToken } from '../auth';

const hrequest = frequest;

// 请求错误处理
const responseError = (res) => {
  let result = {
    errcode: -1,
  };
  if (typeof res === 'string') {
    result = { ...result, errmsg: res };
  }
  if (typeof res === 'object') {
    result = {
      errcode: res.body.errcode,
      errmsg: res.body.errmsg,
    };
  }
  return result;
};

// 请求入口
const request = async (options, dispatch, getState) => {
  const { url, endpoint, needAuth = true, ...rest } = options;
  const setUrl = config.url;
  const opts = {
    url: url || `${setUrl}${endpoint}`,
    ...rest,
  };

  if (needAuth) {
    const token = getToken(getState);
    if (token === undefined || token === '') {
      // token失效，需要退出登陆
      setToken(dispatch, '');
      return Promise.reject('token异常');
    }
    const headers = opts.headers || {};
    Object.assign(headers, {
      token
    });
    opts.headers = headers;
  }
  try {
    const res = await hrequest(opts);

    const { body, token } = res;
    if (body.status === -2) {
      // token失效，需要退出登陆
      setToken(dispatch, '');
      console.log('Token失效');
      return Promise.reject(res);
    }
    // 保存token
    if (token) {
      setToken(dispatch, token);
    }
    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject(e);
  }
};

export { request, responseError };
