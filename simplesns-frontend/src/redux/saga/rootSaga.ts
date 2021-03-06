import { spawn } from "redux-saga/effects";
import { tryDeleteComment, tryPostComment, tryPutComment } from "./commentSaga";
import { tryFollow, tryGetFollowData, tryUnFollow } from "./followSaga";
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
  yield spawn(tryGetFollowData);
  yield spawn(tryUnFollow);
}
