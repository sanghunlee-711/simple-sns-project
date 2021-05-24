interface SearchState {
  searchInput: string;
}
// 유니온 타입으로 계속 추가하자
type SearchAction =
  | ReturnType<typeof getSearchData>
  | ReturnType<typeof doSearch>;

//Action Type
export const types = {
  GET_SEARCH_DATA: "search/GET_SEARCH_DATA" as const,
  DO_SEARCH: "search/DO_SEARCH" as const,
};

export const getSearchData = (searchInput: string) => ({
  type: types.GET_SEARCH_DATA,
  payload: searchInput,
});

export const doSearch = (searchInput: string) => ({
  type: types.DO_SEARCH,
  payload: searchInput,
});

//action
export const actions = {
  getSearchData,
  doSearch,
};

//InitialState
export const INITIAL_STATE: SearchState = {
  searchInput: "",
};

//Reducer
export const searchReducer = (
  state: SearchState = INITIAL_STATE,
  action: SearchAction
) => {
  switch (action.type) {
    case "search/GET_SEARCH_DATA":
      return { ...state, searchInput: action.payload };

    case "search/DO_SEARCH":
      return { ...state, searchInput: action.payload };

    default:
      return state;
  }
};

export default searchReducer;
