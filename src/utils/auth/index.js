import jwtDecode from 'jwt-decode';
import { tokenAction, tokenSelect } from '../../redux/token';

const setToken = (dispatch, token) => {
  try {
    const s = jwtDecode(token);
    if (!s || !s.aud || s.aud.length === 0 || s.aud[0] === null || s.aud[0] === undefined || s.aud[0] === '') {
      dispatch(tokenAction.actionSetToken(undefined, undefined));
    } else {
      const userId = s.aud[0];
      dispatch(tokenAction.actionSetToken(token, userId));
    }
  } catch (e) {
    dispatch(tokenAction.actionSetToken(undefined, undefined));
  }
};

const getToken = (getState) => {
  const state = getState();
  const token = tokenSelect.getTokenSelect(state);
  return token;
};

const getUserId = (getState) => {
  const state = getState();
  const userId = tokenSelect.getUserIdSelect(state);
  return userId;
};

export { setToken, getToken, getUserId };
