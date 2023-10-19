import mongoose from "mongoose";
const toolSchema = new mongoose.Schema({
    name : {type : String, required : true, unique : true},
    punjabiName : {type : String, required : true},
    quantity : {type : Number, required : true, default : 0},
    price : {type : Number, required : true}
})
const toolModel = mongoose.models.Tool || mongoose.model('Tool',toolSchema);
export default toolModel;