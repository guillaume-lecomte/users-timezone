export const ADD_USER_REQUEST = "users/ADD_USER_REQUEST";
export function addUserRequest(newUser) {
  return { type: ADD_USER_REQUEST, payload: newUser };
}

export const ADD_USER = "users/ADD_USER";
export function addUser(newUser) {
  return { type: ADD_USER, payload: newUser };
}

export const MODIFY_USER_REQUEST = "users/MODIFY_USER_REQUEST";
export function modifyUserRequest(user) {
  return { type: MODIFY_USER_REQUEST, payload: user };
}

export const MODIFY_USER = "users/MODIFY_USER";
export function modifyUser(user) {
  return { type: MODIFY_USER, payload: user };
}

export const REMOVE_USER_REQUEST = "users/REMOVE_USER_REQUEST";
export function removeUserRequest(id) {
  return { type: REMOVE_USER_REQUEST, payload: { id } };
}

export const REMOVE_USER = "users/REMOVE_USER";
export function removeUser(id) {
  return { type: REMOVE_USER, payload: { id } };
}

export const GET_USERS_REQUEST = "users/GET_USERS_REQUEST";
export function getUsersRequest() {
  return { type: GET_USERS_REQUEST };
}

export const GET_USERS = "users/GET_USERS";
export function getUsers(users) {
  return { type: GET_USERS, payload: { users } };
}

export const USER_OPERATION_FAILED = "users/USER_OPERATION_FAILED";
export function userOperationFailed(error) {
  return { type: USER_OPERATION_FAILED, payload: error };
}
