export const initialState = {
  user: null,
};

export const allActionTypes = {
  SETUSER: "SETUSER",
  LOGOUT_USER: "LOGOUT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case allActionTypes.SETUSER:
      return { ...state, user: action };

    case allActionTypes.LOGOUT_USER:
      return { ...state, user: null };

    default:
      return state;
  }
};

export default reducer;
