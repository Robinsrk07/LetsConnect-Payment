const {NotFoundError}= require("../errors/customError")

class  premiumVerifyCase{
    constructor(userRepository){
        this.userRepository = userRepository

    }
    async execute(userId){
      const user = await this.userRepository.find(userId)
      if(!user){
        throw new NotFoundError("user not found")
      }
    }
}

module.exports=premiumVerifyCase