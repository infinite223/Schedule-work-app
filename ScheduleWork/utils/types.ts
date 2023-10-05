type User = {
    id: string,
    name: string, 
    userName: string,
    email: string,
    phoneNumber?: number 

    workPlaceId: string,
    groupId:  string
}

type WorkPlace = {
    id: string, 
    name: string,
    adminId: String
}

type Group = {
    id: string, 
    name: string,
    description: string,
    workPlaceId: string,
    users?: User[] 
}

type Day = {
    id: string,
    date: String,
    groupId: string
}

type UserInDay = {
    id: string,
    from: string,
    to: string,

    userId: string,
    user?: User,
    day?: Day,
    dayId: string
}

export { Group, User, WorkPlace, UserInDay, Day }
