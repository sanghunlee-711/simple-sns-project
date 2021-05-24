import { call, put, take } from "redux-saga/effects";
import { getSerachData } from "../../utils/api/searchApi";
import { actions as loadingActions } from "../reducer/loadingReducer";
import { types } from "../reducer/searchReducer";

export function* getSearchData() {
  while (true) {
    const { payload } = yield take(types.DO_SEARCH);
    yield put(loadingActions.setLoading(true));

    try {
      const { data } = yield call(getSerachData, payload);
      console.log(data);
      // yield put(actions.getTokenData(data.id, data.nick, true));
    } catch (error) {
      console.error(error);
    }
    yield put(loadingActions.setLoading(false));
  }
}
