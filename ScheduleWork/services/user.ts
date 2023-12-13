import { appConfig } from "../appConfig";
import { setCountRequestStorage } from "../utils/functions";

export const createUser = async (
  userName: string,
  phoneNumber: string | null,
  name: string,
  email: string

) => {
  const res = await fetch(
    `${appConfig.endpointsUrl}/user`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ userName, name, phoneNumber, email }),
    },
  );

  setCountRequestStorage()

  return res;
}
export const updateUser = async (
  userName: string,
  phoneNumber: string | null,
  name: string,

  id: string,
) => {
  console.log(phoneNumber, "user ");
  const res = await fetch(`${appConfig.endpointsUrl}/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ userName, name, phoneNumber }),
  });

  setCountRequestStorage()

  return res;
};

export const getUser = async (userId: string) => {
  console.log(userId)
  const res = await fetch(`${appConfig.endpointsUrl}/user/${parseInt(userId).toString()}`, {
    method: "GET",
  });

  setCountRequestStorage()

  return res;
};

export const getUsersWithOutGroup = async (
  workPlaceId: string,
) => {
  const res = await fetch(
    `${appConfig.endpointsUrl}/user/usersInWorkPace/${workPlaceId}`,
    {
      method: "GET",
    },
  );

  setCountRequestStorage()

  return res;
};

export const getHoursPrediction = async () => {
  const res = await fetch(
    `${appConfig.endpointsUrl}/user/getHoursPrediction/currentMonth`,
    {
      method: "GET",
    },
  );

  setCountRequestStorage()

  return res;
};

export const removeUserFromGroup = async (
  userId: string,
  groupId: string,
) => {
  const res = await fetch(
    `${appConfig.endpointsUrl}/user/removeUserFromGroup`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ userId, groupId }),
    },
  );

  setCountRequestStorage()

  return res;
};
