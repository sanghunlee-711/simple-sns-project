import { call, put, take } from "redux-saga/effects";
import { CheckToken } from "../../utils/api/commentApi";
import { GetHashTagData, PutPostData } from "../../utils/api/postApi";
import { actions as loadingActions } from "../reducer/loadingReducer";
import { actions, types } from "../reducer/postReducer";
import { actions as searchActions } from "../reducer/searchReducer";

export function* checkToken() {
  while (true) {
    try {
      yield take(types.CHECK_TOKEN);
      yield put(loadingActions.setLoading(true));
      const { data } = yield call(CheckToken);

      yield put(actions.getTokenData(data.id, data.nick, true));
    } catch (error) {
      console.error(error);
    }
    yield put(loadingActions.setLoading(false));
  }
}

export function* tryModifyPost() {
  while (true) {
    try {
      const { payload } = yield take(types.PUT_CONTENT_DATA);
      const { postId, changedContent, titleImgUrl, title } = payload;

      yield put(loadingActions.setLoading(true));
      yield call(PutPostData, postId, changedContent, titleImgUrl, title);
    } catch (error) {
      console.error(error);
    }
    yield put(loadingActions.setLoading(false));
  }
}

export function* getHashtagData() {
  while (true) {
    const { payload } = yield take(types.GET_HASHTAG_DATA);
    yield put(loadingActions.setLoading(true));

    try {
      const { data } = yield call(GetHashTagData, payload.hashtagText);
      console.log("yield", data);
      yield put(searchActions.saveSearchData(data));
    } catch (error) {
      console.error(error);
    }
    yield put(loadingActions.setLoading(false));
  }
}
