const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//Register a user => /api/v1/resister
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    // const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder:'avatars',
    //     width:150,
    //     crop:"scale"
    // })

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "Avatars/saad-removebg-preview_svkgej",
            url: "https://res.cloudinary.com/dffmlvcxd/image/upload/v1640177692/Avatars/saad-removebg-preview_svkgej.png"
            // public_id: result.public_id,
            // url: result.secure_url
        }
    })

    // sendToken(user, 200, res)

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
    })
})

// Login User => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //Check if email and password is entered by user
    if (!email || !password) {
        return await next(new ErrorHandler('Please enter email and password', 400))
    }

    //Finding user in database 
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    //Check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    const token = user.getJwtToken();

    // sendToken(user, 200, res)

    res.status(200).json({
        success: true,
        token
    })
})

