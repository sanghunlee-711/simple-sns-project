import { all, fork, take } from "redux-saga/effects";

export const types = {
  //전체 로그아웃
  LOGOUT: "auth/LOGOUT",
  //전체 로그인
  LOGIN: "auth/LOGIN",
  //포스트 게시글을 위한 에디터 컨텐츠 업로드
  UPLOAD: "post/UPLOAD",
  //메인에서 전체 게시글 가져오는 액션
  GET_POST: "post/GET_POST",
  //세부보기 들어가서 하나의 게시글 내용 가져오는 액션
  GET_EACH_POST: "article/GET_EACH_POST",

  //redux saga에서 사용하기 위해 모든 액션타입을 하나의 객체에 담아서 내보낸다.
  INCREASE_NEXT_PAGE: "timeline/INCREASE_NEXT_PAGE",
  //좋아요 버튼 클릭 시 발생하는 액션타입이다. 아래액션타입은 사가에서만 사용되고 리듀서함수에는 사용되지않는다.
  REQUEST_LIKE: "timeline/REQUEST_LIKE",
  //좋아요 숫자 변경을 위한 action 타입이다.
  ADD_LIKE: "timeline/ADD_LIKE",
  //로딩 여부를 알려줄 액션타입이다.
  SET_LOADING: "timeline/SET_LOADING",
  //에러 정보를 저장하는 액션타입 설정
  SET_ERROR: "timeline/SET_ERROR",
  //리덕스의 text상태값을 변경하는 액션타입 추가
  SET_TEXT: "timeline/SET_TEXT",
  //리덕스의 상태값변경을 시도하는 액션타입 TRY_SET_TEXT액션타입은 사가함수에서만 사용된다.
  TRY_SET_TEXT: "timeline/TRY_SET_TEXT",
};

export function* fetchData() {
  while (true) {
    const { timeline } = yield take(types.REQUEST_LIKE);
    try {
      console.log("..");
    } catch (error) {
      console.error(error);
    }
  }
}

export function* navSaga() {
  console.log("In Nav-Saga");
  yield all([fork(fetchData)]);
}
