import { appConfig } from "../appConfig";
import { setCountRequestStorage } from "../utils/functions";

export const createGroup = async (
  name: string,
  description: string,
) => {
  const res = await fetch(`${appConfig.endpointsUrl}/group`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name, description }),
  });

  return res;
};

export const getScheduleForMonth = async (
  startDate: string,
  endDate: string,
) => {
  const res = await fetch(`${appConfig.endpointsUrl}/group/getGroupWithDays`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ startDate, endDate }),
  });

  return res;
};

export const getGroupsInWorkPlace = async (
  workPlaceId: string,
) => {
  const res = await fetch(`${appConfig.endpointsUrl}/group/${workPlaceId}`, {
    method: "GET",
  });

  return res;
};

export const updateGroup = async (
  name: string,
  description: string,
  id: string,
) => {
  const res = await fetch(`${appConfig.endpointsUrl}/group/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ name, description }),
  });

  return res;
};

export const addUserToGroup = async (
  userId: string,
  groupId: string,
) => {
  const res = await fetch(`${appConfig.endpointsUrl}/group/addUserToGroup`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ groupId, userId }),
  });

  setCountRequestStorage()

  return res;
};

export const removeGroup = async (id: string) => {
  const res = await fetch(`${appConfig.endpointsUrl}/group/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });

  setCountRequestStorage()

  return res;
};
