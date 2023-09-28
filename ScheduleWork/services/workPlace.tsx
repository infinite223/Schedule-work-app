import { appConfig } from "../appConfig"

export const getAllWorkPlace = async (authToken: string) => {
    const res = await fetch(`${appConfig.endpointsUrl}/workPlace`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
          },
          method: "GET",    
    })

    return res
}