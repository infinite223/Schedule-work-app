type User = {
    id: string,
    name: string, 
    userName: string,

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
    workPlaceId: string
}

export { Group, User, WorkPlace }
