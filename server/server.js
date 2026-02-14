const express = require('express');
const app = express();
const mongoose = require('mongoose');
const AdminRouter = require('./router/adminRouter');
const { SuperAdmin } = require('./seeds/superAdmin');
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('dotenv').config();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AdminRouter);
mongoose.connect(process.env.VITE_MONGO_URL).then(async () => {
    await SuperAdmin();
    app.listen(3000, () => {
        console.log('server run on port http://localhost:3000');
    });
}).catch(err => {
    console.log("mongodb connection error", err);
});
