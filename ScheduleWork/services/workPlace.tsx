import { appConfig } from "../appConfig"

export const getWorkPlace = async (authToken: string, workPlaceId: string) => {
    const res = await fetch(`${appConfig.endpointsUrl}/workPlace/${workPlaceId}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
          },
          method: "GET",    
    })

    return res
}