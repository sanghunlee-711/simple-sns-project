interface NavActionType {
  type: string;
  payload: string;
}

export const initialState = {
  state1: { nick: "" },
  state2: [],
  state3: "",
};

export const navReducer = (state = initialState, action: NavActionType) => {
  switch (action.type) {
    case "ADD_NICK":
      return { ...state, state1: { nick: action.payload } };

    default:
      return state;
  }
};
