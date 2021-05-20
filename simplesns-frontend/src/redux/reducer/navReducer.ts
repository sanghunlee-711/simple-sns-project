interface NavState {
  toggle: boolean;
  burgerToggle: boolean;
  state2: [];
  state3: string;
}

//Action Type
const DOTOGGLE_POST = "nav/DOTOGGLE_POST" as const;
const BURGERTOGGLE_POST = "nav/BURGERTOGGLE_POST" as const;

//Action Creator
export const togglePost = (toggle: boolean) => ({
  type: DOTOGGLE_POST,
  payload: toggle,
});

export const toggleBurger = (burgetToggle: boolean) => ({
  type: BURGERTOGGLE_POST,
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
