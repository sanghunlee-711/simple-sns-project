import axios from "axios";
import { call, put, take } from "redux-saga/effects";
import { BASE_URL } from "../../config/config.json";
import { config } from "../../utils/util";
import { types } from "../reducer/followReducer";
import { actions as loadingActions } from "../reducer/loadingReducer";

const doFollow = (followId: number) => {
  const url = `${BASE_URL}/follow`;
  console.log("@@@FOLLOLW IDIDIDI", followId);
  const body = {
    followId,
  };

  return axios.post(url, body, config);
};

export function* tryFollow() {
  while (true) {
    const { payload } = yield take(types.SEND_FOLLOW);
    console.log("@@@@@@@@", payload);

    yield put(loadingActions.setLoading(true));

    try {
      yield call(doFollow, payload);
    } catch (error) {
      console.error(error);
    }
    yield put(loadingActions.setLoading(false));
  }
}
