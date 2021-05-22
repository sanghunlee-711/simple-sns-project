import { call, put, take } from "redux-saga/effects";
import { CheckToken } from "../../utils/api/commentApi";
import { PutPostData } from "../../utils/api/postApi";
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

export function* tryModifyPost() {
  while (true) {
    const { payload } = yield take(types.PUT_CONTENT_DATA);
    yield put(loadingActions.setLoading(true));
    const { postId, changedContent, titleImgUrl } = payload;
    try {
      yield call(PutPostData, postId, changedContent, titleImgUrl);
    } catch (error) {
      console.error(error);
    }
    yield put(loadingActions.setLoading(false));
  }
}
