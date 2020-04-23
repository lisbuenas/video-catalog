const initialLoginState = {
  userData: false,
};

export default function reducer(state = initialLoginState, { type, payload }) {
  //
  switch (type) {
    case "SET_USER_STATE":
      return {
        ...state,
        userData: payload,
      };
    default:
      return state;
  }
  return state;
}
