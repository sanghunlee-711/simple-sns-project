interface NavState {
  toggle: boolean;
  burgerToggle: boolean;
  state2: [];
  state3: string;
}

//Action Type
export const types = {
  DOTOGGLE_POST: "nav/DOTOGGLE_POST" as const,
  BURGERTOGGLE_POST: "nav/BURGERTOGGLE_POST" as const,
  //전체 로그아웃
  LOGOUT: "auth/LOGOUT" as const,
  //전체 로그인
  LOGIN: "auth/LOGIN" as const,
  //포스트 게시글을 위한 에디터 컨텐츠 업로드
  UPLOAD: "post/UPLOAD" as const,
  //메인에서 전체 게시글 가져오는 액션
  GET_POST: "post/GET_POST" as const,
  //세부보기 들어가서 하나의 게시글 내용 가져오는 액션
  GET_EACH_POST: "article/GET_EACH_POST" as const,
  POST_COMMENT: "comment/POST_COMMENT" as const,
};

//Action Creator
export const togglePost = (toggle: boolean) => ({
  type: types.DOTOGGLE_POST,
  payload: toggle,
});

export const toggleBurger = (burgetToggle: boolean) => ({
  type: types.BURGERTOGGLE_POST,
  payload: burgetToggle,
});

// 유니온 타입으로 계속 추가하자
type NavAction =
  | ReturnType<typeof togglePost>
  | ReturnType<typeof toggleBurger>;

//InitialState
export const INITIAL_STATE: NavState = {
  toggle: false,
  burgerToggle: false,
  state2: [],
  state3: "",
};

//Reducer
export const navReducer = (
  state: NavState = INITIAL_STATE,
  action: NavAction
) => {
  switch (action.type) {
    case "nav/DOTOGGLE_POST":
      console.log("Work?", action.payload);
      return { ...state, toggle: action.payload };
    case "nav/BURGERTOGGLE_POST":
      return { ...state, burgerToggle: action.payload };

    default:
      return state;
  }
};

export default navReducer;
