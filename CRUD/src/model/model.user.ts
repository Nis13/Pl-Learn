import { User } from "../interface/user.interface";

const users =[
    {
        id:1,
        name: "Admin",
        email:"Admin@gmail.com",
    },
    {
        id:2,
        name: "User",
        email:"User@gmail.com"
    }
];

export function getAllUsersModel(): User[]{
    return users;
}

export function getUserById(id:number): User|undefined{
    const userDetail = users.find((user) => user.id == id);
    return userDetail;
}

export function createUser(userDetails: Pick<User, 'name'|'email'>): string{
    const highestId = Math.max(...users.map(user => user.id));
    const newUser = {
        ...userDetails,
        id: highestId +1
    };
    users.push(newUser);
    return "User created successfully";
}

export function updateUser(id:number,updateUserDetails: Partial<User>): User{
    users.forEach(user => {
        if (user.id === id) {
            if (updateUserDetails.name !== undefined) user.name = updateUserDetails.name ;
            if (updateUserDetails.email !== undefined) user.email = updateUserDetails.email;
        }
    });
    return users.find((user) => user.id == id)!;
}

export function deleteUserById(id:number): string{
    const userid = users.findIndex(user => user.id == id);
    if (userid !== -1) users.splice(userid);
    return `user of id ${id} deleted successfully`;
}

