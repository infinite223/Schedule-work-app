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

export const addUserToWorkPlace = async (authToken: string, workPlaceId: string, email: string) => {
    const res = await fetch(`${appConfig.endpointsUrl}/workPlace/addUserToWorkPlace/${workPlaceId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          method: "PUT",    
          body: JSON.stringify({ email })  
    })

    return res
}
