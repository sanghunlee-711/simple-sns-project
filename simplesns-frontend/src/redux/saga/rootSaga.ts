import { spawn } from "redux-saga/effects";
import { tryDeleteComment, tryPostComment, tryPutComment } from "./commentSaga";
import { checkToken } from "./postSaga";

export function* rootSaga() {
  yield spawn(checkToken);
  yield spawn(tryDeleteComment);
  yield spawn(tryPostComment);
  yield spawn(tryPutComment);
}
