import { all, call, fork, put, take } from "redux-saga/effects";
import {
  DeleteCommentData,
  PostCommentData,
  PutCommentData,
} from "../../utils/api";
import { actions, types } from "../reducer/commentReducer";

export function* tryPostComment() {
  while (true) {
    const { payload } = yield take(types.POST_COMMENT);

    yield put(actions.setCommentLoading(true));

    try {
      console.log("????@@@@@");
      yield call(PostCommentData, payload.id, payload.comment);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
    yield put(actions.setCommentLoading(false));
  }
}

export function* tryDeleteComment() {
  while (true) {
    //구조분해할당은 객체 키값을 가져오는거니까 .. 멍충..
    const { payload } = yield take(types.DELETE_COMMENT);
    console.log("InSaga", payload);
    yield put(actions.setCommentLoading(true));

    try {
      yield call(DeleteCommentData, payload);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(`${error.message}에러 발생`);
    }
    yield put(actions.setCommentLoading(false));
  }
}

export function* tryPutComment() {
  while (true) {
    const { payload } = yield take(types.PUT_COMMENT);
    yield put(actions.setCommentLoading(true));

    try {
      yield call(PutCommentData, payload.id, payload.updateComment);
    } catch (error) {
      console.error(error);
      alert(`${error.message}에러 발생`);
    }
    window.location.reload();
    yield put(actions.setCommentLoading(false));
  }
}

export function* commentSaga() {
  console.log("In Nav-Saga");
  yield all([
    fork(tryPostComment),
    fork(tryDeleteComment),
    fork(tryPutComment),
  ]);
}
