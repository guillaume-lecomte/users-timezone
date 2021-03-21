import { takeEvery } from "redux-saga/effects";
import {
  GET_USERS_REQUEST,
  ADD_USER_REQUEST,
  REMOVE_USER_REQUEST,
  MODIFY_USER_REQUEST,
} from "../actions/userActions";
import {
  getUsersSaga,
  createUserSaga,
  deleteUserSaga,
  updateUserSaga,
} from "./usersSaga";

export default function* watchAll() {
  yield takeEvery(GET_USERS_REQUEST, getUsersSaga);
  yield takeEvery(ADD_USER_REQUEST, createUserSaga);
  yield takeEvery(REMOVE_USER_REQUEST, deleteUserSaga);
  yield takeEvery(MODIFY_USER_REQUEST, updateUserSaga);
}
