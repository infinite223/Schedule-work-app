import { appConfig } from "../appConfig";
import { setCountRequestStorage } from "../utils/functions";

export const getWorkPlace = async (workPlaceId: string) => {
  const res = await fetch(
    `${appConfig.endpointsUrl}/workPlace/${workPlaceId}`,
    {
      method: "GET",
    },
  );

  return res;
};

export const addUserToWorkPlace = async (
  workPlaceId: string,
  email: string,
) => {
  const res = await fetch(
    `${appConfig.endpointsUrl}/workPlace/addUserToWorkPlace/${workPlaceId}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ email }),
    },
  );

  setCountRequestStorage();

  return res;
};
