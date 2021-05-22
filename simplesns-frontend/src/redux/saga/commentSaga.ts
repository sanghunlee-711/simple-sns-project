import { call, put, take } from "redux-saga/effects";
import {
  DeleteCommentData,
  PostCommentData,
  PutCommentData,
} from "../../utils/api/commentApi";
import { types } from "../reducer/commentReducer";
import { actions as loadingActions } from "../reducer/loadingReducer";

export function* tryPostComment() {
  while (true) {
    const { payload } = yield take(types.POST_COMMENT);

    yield put(loadingActions.setLoading(true));

    try {
      yield call(PostCommentData, payload.id, payload.comment);
    } catch (error) {
      console.error(error);
    }
    yield put(loadingActions.setLoading(false));
    window.location.reload();
  }
}

export function* tryDeleteComment() {
  while (true) {
    //구조분해할당은 객체 키값을 가져오는거니까 .. 멍충..
    const { payload } = yield take(types.DELETE_COMMENT);
    console.log("InSaga", payload);
    yield put(loadingActions.setLoading(true));

    try {
      yield call(DeleteCommentData, payload);
    } catch (error) {
      console.error(error);
      alert(`${error.message}에러 발생`);
    }
    yield put(loadingActions.setLoading(false));
    window.location.reload();
  }
}

export function* tryPutComment() {
  while (true) {
    const { payload } = yield take(types.PUT_COMMENT);
    yield put(loadingActions.setLoading(true));

    try {
      yield call(PutCommentData, payload.id, payload.updateComment);
    } catch (error) {
      console.error(error);
      alert(`${error.message}에러 발생`);
    }
    yield put(loadingActions.setLoading(false));
    window.location.reload();
  }
}
