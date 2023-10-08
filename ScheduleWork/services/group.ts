import { appConfig } from "../appConfig"

export const createGroup = async (
        authToken: string,
        name: string, 
        description: string,
    ) => {
    const res = await fetch(`${appConfig.endpointsUrl}/group`, {
        headers: {
            'Content-Type':'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          method: "POST",   
          body: JSON.stringify({name, description})   
    })

    return res
}


export const getGroupsInWorkPlace = async (authToken: string, workPlaceId: string) => {
    const res = await fetch(`${appConfig.endpointsUrl}/group/${workPlaceId}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
            },
            method: "GET", 
    })

    return res
}