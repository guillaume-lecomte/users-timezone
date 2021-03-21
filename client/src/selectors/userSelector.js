import { createSelector } from "reselect";
import { toTimezone, getCurrentDateTime } from "../utils/timeZone";

export const getUsersSelector = (state) => state.users;

export const getUsersByLocaltime = createSelector(
  [getUsersSelector],
  (users) => {
    var formatedUsers = users.reduce((accumulator, currentValue) => {
      const localeTime = toTimezone(
        getCurrentDateTime(),
        currentValue.timeZone
      );
      currentValue.localeTime = localeTime;
      accumulator.push(currentValue);
      return accumulator;
    }, []);

    formatedUsers.sort((a, b) => {
      return a.localeTime < b.localeTime
        ? -1
        : a.localeTime > b.localeTime
        ? 1
        : 0;
    });
    return formatedUsers;
  }
);
