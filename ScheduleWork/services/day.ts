import { appConfig } from "../appConfig";

export const createDay = async (date: string) => {
  const res = await fetch(`${appConfig.endpointsUrl}/day`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ date }),
  });

  return res;
};

export const getDay = async (
  date: string,
  groupId: string,
) => {
  const res = await fetch(`${appConfig.endpointsUrl}/day/getSpecyficDay`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ date, groupId }),
  });

  return res;
};
