import { request } from '../../utils';

// 获取该用户下的所有角色
const userRoleApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: `/user/role/${param}`,
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

export { userRoleApi };
