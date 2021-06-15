import { request } from '../../utils';

// 注册
const signApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/user/sign',
        method: 'POST',
        body: param,
        type: 'form',
        needAuth: false
      },
      dispatch,
      getState,
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

// 登陆
const loginApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/user/login',
        method: 'POST',
        body: param,
        type: 'form',
        needAuth: false
      },
      dispatch,
      getState,
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

// 获取user信息
const getUserApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: `/user/find/${param}`,
        method: 'GET',
      },
      dispatch,
      getState,
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export { signApi, loginApi, getUserApi };
