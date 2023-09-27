export const getAllWorkPlace = async (authToken: string) => {
    const res = await fetch('http://192.168.100.16:3000/workPlace', {
        headers: {
            Authorization: `Bearer ${authToken}`,
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
          },
          method: "GET",    
    })

    return res
}