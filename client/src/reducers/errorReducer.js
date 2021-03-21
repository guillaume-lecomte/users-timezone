import { USER_OPERATION_FAILED } from "../actions/userActions";
import { CLOSE_TOASTER } from "../actions/errorActions";

const initialState = {
  message: null,
  isOpen: false,
};

function errorReducer(state = initialState, { type, payload }) {
  switch (type) {
    case USER_OPERATION_FAILED: {
      return { ...state, message: payload, isOpen: true };
    }
    case CLOSE_TOASTER: {
      return { ...state, message: null, isOpen: false };
    }
    default:
      return state;
  }
}

export default errorReducer;
