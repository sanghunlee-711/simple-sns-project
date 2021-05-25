import { call, put, take } from "redux-saga/effects";
import { ContentsData } from "../../model/ArticleModel";
import { getSearchData as callSearchData } from "../../utils/api/searchApi";
import { actions as loadingActions } from "../reducer/loadingReducer";
import { actions as searchActions, types } from "../reducer/searchReducer";

export function* getSearchData() {
  while (true) {
    const { payload } = yield take(types.DO_SEARCH);
    yield put(loadingActions.setLoading(true));

    try {
      const { data } = yield call(callSearchData, payload);
      console.log("In SAGA", data);
      yield put(searchActions.saveSearchData(data as ContentsData[]));
      // yield put(actions.getTokenData(data.id, data.nick, true));
    } catch (error) {
      console.error(error);
    }
    yield put(loadingActions.setLoading(false));
  }
}
