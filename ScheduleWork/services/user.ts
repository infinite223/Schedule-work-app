import { appConfig } from "../appConfig"

export const updateUser = async (
        authToken: string,
        userName: string,
        name: string,
        id: string
    ) => {
        console.log(userName, name, id)
    const res = await fetch(`${appConfig.endpointsUrl}/user/${id}`, {
        headers: {
            'Content-Type':'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          method: "PUT",  
          body: JSON.stringify({userName, name})  
    })

    return res
}