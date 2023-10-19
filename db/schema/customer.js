import mongoose from "mongoose";
const customerSchema = new mongoose.Schema({
    name : {type : String , required : true},
    city : {type : String, required : true},
    phone : {type : String, required : true},
    image : {type : String, required : false},
    date : {type : Date, default : Date.now},
    cardtype : {type : String },
    identityCard : {type : String, default : ""},
    status : {type:String, default : "active"},
    rentedTools : [
        {type : Object}
    ],
    rentDays : {type : Number, required : true,default : 1},
    amount : {type : Number, required : true}
},{
    timestamps : true
});
const customerModel = mongoose.models.Customer || mongoose.model('Customer',customerSchema);
export default customerModel;