interface NavState {
  toggle: boolean;
  state2: [];
  state3: string;
}

//Action Type
const DOTOGGLE_POST = "nav/DOTOGGLE_POST" as const;

//Action Creator
export const togglePost = (toggle: boolean) => ({
  type: DOTOGGLE_POST,
  payload: toggle,
});

// 유니온 타입으로 계속 추가하자
type NavAction = ReturnType<typeof togglePost>;

//InitialState
export const INITIAL_STATE: NavState = {
  toggle: false,
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
      return { ...state, toggle: !state.toggle };

    default:
      return state;
  }
};

export default navReducer;
