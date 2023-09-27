export const sendEmail = async (email: string) => {
    const res = await fetch('http://192.168.100.16:3000/auth/login', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({email})
    })

    if(res.status === 200){
        return 'SUCCESS'
    }

    else {
        return "ERROR"
    }
    }

export const authenticateEmail = async (email: string, emailToken: string) => {
    const res = await fetch('http://192.168.100.16:3000/auth/authenticate', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({email, emailToken})
    })

    return res
}

