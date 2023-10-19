import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String},
    gender : {type : String , required : false},
    image : {type: String, required : false}

});
const userModel = mongoose.models.User || mongoose.model('User',userSchema);
export default userModel;