import axios from "axios";
import { call, put, take } from "redux-saga/effects";
import { BASE_URL } from "../../config/config.json";
import { config } from "../../utils/util";
import { actions as followActions } from "../reducer/followReducer";
import { actions as loadingActions } from "../reducer/loadingReducer";

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

const doFollow = (followId: number) => {
  const url = `${BASE_URL}/follow`;
  console.log("@@@FOLLOLW IDIDIDI", followId);
  const body = {
    followId,
  };

  return axios.post(url, body, config);
};

const getFollow = () => {
  const url = `${BASE_URL}/follow/list`;
  console.log("URL HERE", url);
  return axios.get(url, config);
};

export function* tryGetFollowData() {
  while (true) {
    try {
      yield take(followActions.getFollowData);
      console.log("get ??!");
      const result: ResponseGenerator = yield call(getFollow);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

export function* tryFollow() {
  while (true) {
    const { payload } = yield take(followActions.sendFollow);
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
