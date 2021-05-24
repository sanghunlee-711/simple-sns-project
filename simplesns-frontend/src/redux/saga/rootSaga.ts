import { spawn } from "redux-saga/effects";
import { tryDeleteComment, tryPostComment, tryPutComment } from "./commentSaga";
import { checkToken, tryModifyPost } from "./postSaga";
import { getSearchData } from "./searchSaga";

export function* rootSaga() {
  yield spawn(checkToken);
  //comment
  yield spawn(tryDeleteComment);
  yield spawn(tryPostComment);
  yield spawn(tryPutComment);

  //post
  yield spawn(tryModifyPost);

  //search
  yield spawn(getSearchData);
}
