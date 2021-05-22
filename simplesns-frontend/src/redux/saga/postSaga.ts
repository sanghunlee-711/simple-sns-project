import { call, put, take } from "redux-saga/effects";
import { CheckToken } from "../../utils/api";
import { actions as loadingActions } from "../reducer/loadingReducer";
import { actions, types } from "../reducer/postReducer";

export function* checkToken() {
  while (true) {
    yield take(types.CHECK_TOKEN);
    yield put(loadingActions.setLoading(true));

    try {
      const { data } = yield call(CheckToken);

      yield put(actions.getTokenData(data._id, data._nick, true));
    } catch (error) {
      console.error(error);
    }
    yield put(loadingActions.setLoading(false));
  }
}
