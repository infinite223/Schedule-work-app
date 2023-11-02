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

export const getAllUsersInDay = async (authToken: string) => {
    const res = await fetch(`${appConfig.endpointsUrl}/userInDay/getAllFutureUserInDays`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
          },
          method: "GET",    
    })

    return res
}

export const getCurrentMonthUserInDays = async (authToken: string) => {
    const res = await fetch(`${appConfig.endpointsUrl}/userInDay/getCurrentMonthUserInDays`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
          },
          method: "GET",    
    })

    return res
}

export const removeUserInDay = async (
    authToken: string,
    id: string
) => {
    const res = await fetch(`${appConfig.endpointsUrl}/userInDay/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
        method: "DELETE",   
        //   body: JSON.stringify({ from, to, dayId })    
    })

    return res
}