import API from "../utils/api";

export const fetchUsers = async () => {
  let usersResponse;

  try {
    usersResponse = await API.get("users");
  } catch (e) {
    throw new Error(e);
  }

  return usersResponse?.data ? usersResponse?.data : null;
};

export const fetchUser = async (id) => {
  let userResponse;

  try {
    userResponse = await API.get(`users/${id}`);
  } catch (e) {
    throw new Error(e);
  }

  return userResponse?.data ? userResponse?.data : null;
};

export const createUser = async (newUser) => {
  let usersResponse;
  const { username, timeZone, picture } = newUser;
  try {
    const data = new FormData();
    data.append("picture", picture);
    data.append("username", username);
    data.append("timeZone", timeZone);

    usersResponse = await API.post("users", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e) {
    throw new Error(e);
  }

  return usersResponse?.data ? usersResponse?.data : null;
};

export const updateUser = async (id, userUpdated) => {
  let usersResponse;
  const { username, timeZone, picture } = userUpdated;
  try {
    const data = new FormData();
    data.append("picture", picture);
    data.append("username", username);
    data.append("timeZone", timeZone);

    usersResponse = await API.put(`users/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e) {
    throw new Error(e);
  }

  return usersResponse?.data ? usersResponse?.data : null;
};

export const deleteUser = async (id) => {
  try {
    await API.delete(`users/${id}`);
  } catch (e) {
    throw new Error(e);
  }
};
