const User = require("../../domain/entities/user");
const { NotFoundError } = require("../../application/errors/customError");

class UserCreatedCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(Userdata) {
    try {
      if (!Userdata) {
        throw new NotFoundError(
          "invalid userdata userservice  UserCreatedCase"
        );
      }
      const userData= Userdata.data
      console.log("useCase",Userdata.data)
      const user = new User({
        name: userData.name,
        emailId: userData.emailId,
        photoUrl: userData.photoUrl,
        about: userData.about,
        password:userData.password,
        gender: userData.gender,
        isPremium: userData.isPremium,
        memberShipType: userData.memberShipType,
        userId:userData.userId ,
        town :userData.town,
        pincode : userData.pincode,
        dob : userData.dob
      });
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserCreatedCase;
