const Admin=require('../models/Admin');
const bcrypt =require('bcrypt')
exports.SuperAdmin=async()=>{
    const existAdmin=await Admin.findOne({role:'super_admin'});
    if(!existAdmin){
        const hashpassword=await bcrypt.hash('Admin@123',12);
        const super_admin=new Admin({
            name:'Admin',
            email:'SuperAdmin@gmail.com',
            password:hashpassword,
            role:'super_admin'
        }); 
        await super_admin.save();
    }
} 