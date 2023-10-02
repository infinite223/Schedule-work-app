import { appConfig } from "../appConfig"

export const updateUser = async (
        authToken: string,
        userName: string,
        phoneNumber: string,
        name: string,
        id: string
    ) => {
        console.log(phoneNumber, 'user ')
    const res = await fetch(`${appConfig.endpointsUrl}/user/${id}`, {
        headers: {
            'Content-Type':'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          method: "PUT",  
          body: JSON.stringify({userName, name, phoneNumber})  
    })

    return res
}

export const getUser = async (authToken: string, userId: string) => {
    const res = await fetch(`${appConfig.endpointsUrl}/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
          },
          method: "GET",    
    })

    return res
}