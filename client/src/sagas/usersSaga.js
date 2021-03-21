import { put, call } from "redux-saga/effects";
import {
  getUsers,
  addUser,
  userOperationFailed,
  modifyUser,
  removeUser,
} from "../actions/userActions";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/api";

export function* getUsersSaga() {
  try {
    const response = yield call(fetchUsers);
    yield put(getUsers(response));
  } catch (error) {
    yield put(userOperationFailed(error));
  }
}

export function* createUserSaga({ payload }) {
  try {
    const response = yield call(createUser, payload);
    yield put(addUser(response));
  } catch (error) {
    yield put(userOperationFailed(error));
  }
}

export function* updateUserSaga({ payload }) {
  try {
    const user = payload;
    const upadted = yield call(updateUser, user._id, user);
    yield put(modifyUser(upadted));
  } catch (error) {
    yield put(userOperationFailed(error));
  }
}

export function* deleteUserSaga({ payload }) {
  const { id } = payload;
  try {
    yield call(deleteUser, id);
    yield put(removeUser(id));
  } catch (error) {
    yield put(userOperationFailed(error));
  }
}
