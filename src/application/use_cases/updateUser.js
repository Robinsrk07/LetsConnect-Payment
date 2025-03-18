class updateUser{
    constructor(userRepository){
        this.userRepository= userRepository
    }
    async execute(user){
          console.log("updateUser:",user.data.savedUser.userId)
        const ownUser = await this.userRepository.find(user.data.savedUser.userId) 
        console.log("userId fron case",ownUser)
        if(!ownUser){
            throw new Error("not found")
        }

     const update_user =  await this.userRepository.updateUser(user,ownUser[0].userId)

     console.log("updateUser",update_user)
    }
}

module.exports= updateUser