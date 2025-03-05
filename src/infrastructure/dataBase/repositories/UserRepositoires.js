const UserModel = require("../model/UserModel");
const IUserRepository = require("../../../application/interfaces/IUserRepository");
const { DataBaseError } = require("../../errors/customError");
//const User = require("../../../doamin/entities/user");
const mongoose = require("mongoose");

class UserRepository extends IUserRepository {
  constructor(messageBroker) {
    super();
    this.messageBroker = messageBroker; // Inject message broker
  }
  async find(userId) {

    const user = await UserModel.find({userId:userId})
    if(!user){
      throw new DataBaseError("user not Found")
    }
    console.log("user",user)
    return user
  }

  async save(user) {
    try {

      console.log("userdb",user)
      const newUser = new UserModel(user);
      const savedUser = await newUser.save();
    
      return savedUser;
    } catch (err) {
      throw new DataBaseError("Error saving user: " + err.message);
    }
  }

  
  async updateUser(user, userId) {
    try {
      console.log("Received user data:", user.data.savedUser);
      console.log("userId:", userId);
      const {
        firstName,
        lastName,
        emailId,
        photoUrl,
        skills,
        age,
        about,
        gender,
        password,
      } = user.data.savedUser;

      const updateData = {
        firstName,
        lastName,
        emailId,
        photoUrl,
        skills,
        age,
        about,
        gender,
        password,
      };
      const updatedUser = await UserModel.findOneAndUpdate(
        { userId: userId },
        { $set: updateData },
        { new: true }
      );

      if (!updatedUser) {
        throw new DataBaseError("User not found");
      }
      return updatedUser;
    } catch (err) {
      console.error("Update error:", err);
      console.log(err);
      throw new DataBaseError("Error updating user: " + err.message);
    }
  }


  async userUpdatePayment(userId,event,memberShipType){

    let isPremium = event === "payment.captured";

      
      const updation ={ 
        isPremium:isPremium,
        memberShipType:memberShipType

      }


   try{
        const upDatedUser = await UserModel.findOneAndUpdate(
            {userId:userId},{$set:updation},{new:true}
        )
   }catch(err){
            throw new DataBaseError("Error updating user: " + err.message);

   }


  }
}

module.exports = UserRepository;
