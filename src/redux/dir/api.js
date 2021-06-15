import { request } from '../../utils';

// 查
const dirListApi = async (dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/dir/all',
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

export { dirListApi };
