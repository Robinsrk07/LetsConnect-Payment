

const bcrypt = require('bcrypt');

class User {
    constructor({ name, emailId, password, photoUrl,  about, gender,userId,isPremium,memberShipType,town,pincode,dob}) {
        this.name = name;
        this.emailId = emailId;
        this.password = password;
        this.photoUrl = photoUrl || []; // Ensure photoUrl is an array
        this.about = about;
        this.gender = gender;
        this.userId = userId;
        this.isPremium=isPremium;
        this.memberShipType=memberShipType,
        this.town = town;
        this.pincode = pincode;
        this.dob = dob;



    } 

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(userEnteredPassword) {
        return await bcrypt.compare(userEnteredPassword, this.password);
    }


    static fromDatabase(userData) {
        return new User(userData);
    }
}
  
module.exports = User;