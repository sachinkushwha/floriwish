const AdminDb=require('../models/Admin');
exports.Total_sub_admin=async(req,res)=>{
    const total_sub_admin=await AdminDb.find({role:'sub_admin'}).countDocuments();
    res.status(200).json({message:"total sub admin",total_sub_admin});
}
exports.Total_super_admin=async(req,res)=>{
    const total_sub_admin=await AdminDb.find({role:'super_admin'}).countDocuments();
    res.status(200).json({message:"total sub admin",total_sub_admin});
}