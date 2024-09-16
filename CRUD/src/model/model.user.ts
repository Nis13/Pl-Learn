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

export function getAllUsersModel(){
    return users;
}

export function getUserById(id:number){
    const userDetail = users.find((user) => user.id == id);
    if (!userDetail) return {message:`User of ${id} doesn't exists`};
    return userDetail;
}

export function createUser(userDetails: Pick<User, 'name'|'email'>){
    const highestId = Math.max(...users.map(user => user.id));
    const newUser = {
        ...userDetails,
        id: highestId +1
    };
    users.push(newUser);
    return {message:"User created successfully"};
}

export function updateUser(id:number,updateUserDetails: Partial<User>){
    users.forEach(user => {
        if (user.id === id) {
            if (updateUserDetails.name !== undefined) user.name = updateUserDetails.name ;
            if (updateUserDetails.email !== undefined) user.email = updateUserDetails.email;
        }
    });
}

export function deleteUserById(id:number){
    const userid = users.findIndex(user => user.id == id);
    if (userid !== -1) users.splice(userid);
    return `user of id ${id} deleted successfully`;
}

