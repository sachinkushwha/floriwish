const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
exports.Login = async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.status(404).json({ message: 'admin not found' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'invalid credentials' });
    }
    const token = jwt.sign(
        { id: admin._id, role: admin.role },
        process.env.VITE_JWT_SECRET_KEY,
    );


    res.cookie("token", token, {
        httpOnly: true,
        secure: true,        // HTTPS only (Vercel pe default)
        sameSite: "none",    // agar frontend & backend alag domain ho
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    });

    res.status(200).json({
        message: 'login successful',
        admin: {
            id: admin._id,
            email: admin.email,
            role: admin.role
        }
    });
}

exports.LogOut = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/'
    });
    res.status(200).json({
        message: "LogOut Sucessful"
    });
}

exports.CreateSubAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (user) {
        return res.status(409).json({
            message: "email already exist use another"
        })
    }
    const haspassword = await bcrypt.hash(password, 12);
    const subuser = new Admin({ name, email, password: haspassword });
    await subuser.save();

    res.status(200).json({
        message: "Sub-Admin create successfuly"
    })
}