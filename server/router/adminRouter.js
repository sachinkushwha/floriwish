const express=require('express');
const AdminRouter=express.Router();
const {jwtAuth}=require('../middleware/jwtAuth');
const LoginController=require('../controller/login');
const totalAdminsController=require('../controller/totalAdmins');
const { Protect } = require('../middleware/roleBaseAccess');
AdminRouter.get('/',(req,res)=>{
    res.send('this is testing');
});
AdminRouter.post('/login',LoginController.Login);
AdminRouter.post('/logout',jwtAuth,LoginController.LogOut);
AdminRouter.post('/sub-admin',jwtAuth,Protect,LoginController.CreateSubAdmin);
AdminRouter.get('/total_sub_admin',jwtAuth,totalAdminsController.Total_sub_admin);
AdminRouter.get('/total_super_user',jwtAuth,Protect,totalAdminsController.Total_super_admin);
AdminRouter.get('/me',jwtAuth,(req,res)=>{
    return res.status(200).json({
        id:req.user.id,
        role:req.user.role
    })
})

module.exports= AdminRouter;