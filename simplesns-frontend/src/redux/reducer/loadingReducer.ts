interface LoadingState {
  loading: boolean;
}
type LoadingAction = ReturnType<typeof setLoading>;

export const types = {
  SET_LOADING: "loading/SET_LOADING" as const,
};

export const setLoading = (loading: boolean) => ({
  type: types.SET_LOADING,
  payalod: loading,
});

export const actions = {
  setLoading,
};

export const INITIAL_STATE: LoadingState = {
  loading: false,
};

export const loadingReducer = (
  state: LoadingState = INITIAL_STATE,
  action: LoadingAction
) => {
  switch (action.type) {
    case "loading/SET_LOADING":
      return { ...state, loading: action.payalod };
    default:
      return state;
  }
};

export default loadingReducer;
