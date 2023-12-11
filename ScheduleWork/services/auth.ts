import { appConfig } from "../appConfig";

export const sendEmail = async (email: string) => {
  const res = await fetch(`${appConfig.endpointsUrl}/auth/login`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email }),
  });
  console.log(res, "tutaj");
  if (res.status === 200) {
    return "SUCCESS";
  } else {
    return "ERROR";
  }
};

export const authenticateEmail = async (email: string, emailToken: string) => {
  const res = await fetch(`${appConfig.endpointsUrl}/auth/authenticate`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, emailToken }),
  });

  return res;
};
