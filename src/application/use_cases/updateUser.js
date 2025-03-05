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

        await this.userRepository.updateUser(user,ownUser[0].userId)
    }
}

module.exports= updateUser