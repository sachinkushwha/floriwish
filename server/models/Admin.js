const mongoose=require('mongoose');

const AdminSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:['super_admin','sub_admin'],default:'sub_admin',required:true}
});
module.exports=mongoose.model('admin',AdminSchema);