import { appConfig } from "../appConfig"

export const createUserInDay = async (
        authToken: string,
        from: string, 
        to: string,
        dayId: string
    ) => {
    const res = await fetch(`${appConfig.endpointsUrl}/userInDay`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          method: "POST",   
          body: JSON.stringify({ from, to, dayId })    
    })

    return res
}

export const getUsersInDay = async (authToken: string, date: Date, groupId: string) => {
    const res = await fetch(`${appConfig.endpointsUrl}/day`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
          },
          method: "GET",    
          body: JSON.stringify({ date, groupId })    
    })

    return res
}
