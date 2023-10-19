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

export const getScheduleForMonth = async (authToken: string, startDate: string, endDate: string) => {
    console.log(authToken,"xd ", startDate)
    const res = await fetch(`${appConfig.endpointsUrl}/group/getGroupWithDays`, {
        headers: {
            'Content-Type':'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          method: "POST",    
          body: JSON.stringify({ startDate, endDate })    
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

export const updateGroup = async (
    authToken:  string,
    name: string, 
    description: string,
    id: string
) => {
    
    const res = await fetch(`${appConfig.endpointsUrl}/group/${id}`, {
        headers: {
            'Content-Type':'application/json',
            Authorization: `Bearer ${authToken}`,
        },
        method: "PUT",  
        body: JSON.stringify({ name, description})  
    })

    return res
}

export const addUserToGroup = async (
    authToken:  string,
    userId: string,
    groupId: string
) => {
    
    const res = await fetch(`${appConfig.endpointsUrl}/group/addUserToGroup`, {
        headers: {
            'Content-Type':'application/json',
            Authorization: `Bearer ${authToken}`,
        },
        method: "POST",  
        body: JSON.stringify({ groupId, userId })  
    })

    return res
}

export const removeGroup = async (
    authToken: string,
    id: string
) => {
    const res = await fetch(`${appConfig.endpointsUrl}/group/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
        method: "DELETE",   
    })

    return res
}

