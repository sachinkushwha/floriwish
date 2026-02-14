exports.Protect = (req, res, next) => {
    const role = req.user.role;
    console.log(role)
    if (role === 'sub_admin') {
        return res.status(403).json({ message: 'access denied' });
    } else {
        next();
    }

}