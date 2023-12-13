import { appConfig } from "../appConfig";
import { setCountRequestStorage } from "../utils/functions";

export const authenticateEmailV2 = async (email: string | null) => {
  const res = await fetch(`${appConfig.endpointsUrl}/auth/authenticateV2`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email }),
  });
  setCountRequestStorage()
  
  return res;
};
