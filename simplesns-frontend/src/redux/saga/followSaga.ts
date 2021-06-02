import axios from "axios";
import { call, put, take } from "redux-saga/effects";
import { BASE_URL } from "../../config/config.json";
import { config } from "../../utils/util";
import {
  actions as followActions,
  types as followTypes,
} from "../reducer/followReducer";
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
  const body = {
    followId,
  };

  return axios.post(url, body, config);
};

const getFollow = () => {
  const url = `${BASE_URL}/follow/list`;
  console.log("URL HERE", url, config);
  return axios.get(url, config);
};

const getUserPersonalPageData = () => {
  const url = `${BASE_URL}/follow/userData`;

  return axios.get(url, config);
};

export function* tryGetFollowData() {
  while (true) {
    try {
      yield take(followTypes.GET_FOLLOW_DATA);
      console.log("work??...");
      const result: ResponseGenerator = yield call(getFollow);
      console.log(result);
      yield put(followActions.saveFollowData(result.data));
    } catch (error) {
      console.error(error);
    }
  }
}

export function* tryFollow() {
  while (true) {
    try {
      const { payload } = yield take(followTypes.SEND_FOLLOW);
      console.log("@@@@@@@@", payload);

      yield put(loadingActions.setLoading(true));
      yield call(doFollow, payload);
    } catch (error) {
      console.error(error);
    }
    yield put(loadingActions.setLoading(false));
  }
}

export function* tryGetUserPersonalPageData() {
  while (true) {
    try {
    } catch (error) {
      console.error(error);
    }
  }
}
