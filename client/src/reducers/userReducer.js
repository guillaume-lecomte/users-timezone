import {
  ADD_USER,
  MODIFY_USER,
  REMOVE_USER,
  GET_USERS,
} from "../actions/userActions";

const initialState = [];

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_USER: {
      return [...state, payload];
    }
    case MODIFY_USER: {
      const { _id, username, timeZone, picture } = payload;

      return state.map((user) =>
        user._id === _id ? { ...user, username, timeZone, picture } : user
      );
    }
    case REMOVE_USER: {
      const { id } = payload;
      return state.filter((user) => user._id !== id);
    }
    case GET_USERS: {
      const { users } = payload;
      return [...state, ...users];
    }
    default:
      return state;
  }
}

export default userReducer;
