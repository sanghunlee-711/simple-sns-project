import { spawn } from "redux-saga/effects";
import { tryDeleteComment, tryPostComment, tryPutComment } from "./commentSaga";
import { tryFollow } from "./followSaga";
import { checkToken, getHashtagData, tryModifyPost } from "./postSaga";
import { getSearchData } from "./searchSaga";

export function* rootSaga() {
  yield spawn(checkToken);
  //comment
  yield spawn(tryDeleteComment);
  yield spawn(tryPostComment);
  yield spawn(tryPutComment);

  //post
  yield spawn(tryModifyPost);
  yield spawn(getHashtagData);

  //search
  yield spawn(getSearchData);

  //follow
  yield spawn(tryFollow);
}
