import { appConfig } from "../appConfig";
import { setCountRequestStorage } from "../utils/functions";

export const createUserInDay = async (
  from: string,
  to: string,
  dayId: string,
  userId: string
) => {
  const res = await fetch(`${appConfig.endpointsUrl}/userInDay`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ from, to, dayId, userId }),
  });

  return res;
};

export const getUsersInDay = async (
  date: Date,
  groupId: string,
) => {
  const res = await fetch(`${appConfig.endpointsUrl}/day`, {
    method: "GET",
    body: JSON.stringify({ date, groupId }),
  });

  return res;
};

export const getAllUsersInDay = async (userId: string) => {
  const res = await fetch(
    `${appConfig.endpointsUrl}/userInDay/getAllFutureUserInDays/${userId}`,
    {
      method: "GET",
    },
  );

  return res;
};

export const getCurrentMonthUserInDays = async (userId: String) => {
  const res = await fetch(
    `${appConfig.endpointsUrl}/userInDay/getCurrentMonthUserInDays/${userId}`,
    {
      method: "GET",
    },
  );

  return res;
};

export const removeUserInDay = async (id: string) => {
  const res = await fetch(`${appConfig.endpointsUrl}/userInDay/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
    //   body: JSON.stringify({ from, to, dayId })
  });

  setCountRequestStorage()

  return res;
};
