import { request } from '../../utils';

const signApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/user/sign',
        method: 'POST',
        body: param,
        type: 'form'
      },
      dispatch,
      getState,
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export { signApi };
