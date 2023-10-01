import { appConfig } from "../appConfig"

export const createDay = async (
        authToken: string,
        groupId: string, 
        date: string
    ) => {
    const res = await fetch(`${appConfig.endpointsUrl}/day`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
          },
          method: "POST",   
          body: JSON.stringify({ groupId, date })    
    })

    return res
}

export const getDay = async (authToken: string, date: Date, groupId: string) => {
    const res = await fetch(`${appConfig.endpointsUrl}/day`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
          },
          method: "GET",    
          body: JSON.stringify({ date, groupId })    
    })

    return res
}
