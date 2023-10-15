import { appConfig } from "../appConfig"

export const createDay = async (
        authToken: string,
        date: string
    ) => {
        console.log(date)
    const res = await fetch(`${appConfig.endpointsUrl}/day`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          method: "POST",   
          body: JSON.stringify({ date })    
    })

    return res
}

export const getDay = async (authToken: string, date: string, groupId: string) => {
    const res = await fetch(`${appConfig.endpointsUrl}/day/getSpecyficDay`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          method: "POST",    
          body: JSON.stringify({ date, groupId })    
    })

    return res
}
