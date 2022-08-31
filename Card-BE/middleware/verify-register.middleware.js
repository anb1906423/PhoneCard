const ApiError = require('../api-error')
const User = require('../model/User')

//Cần bổ sung validate số ký tự mỗi input

const checkDuplicateUsernameOrEmail = async (req, res, next) => {

    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!(emailReg.test(req.body.email))) {
        return next(
            new ApiError(422, 'Email address is not valid!')
        )
    }

    const usernameReg = /^[a-zA-Z0-9]+$/
    if (!(usernameReg.test(req.body.user))) {
        return next(
            new ApiError(422, 'Username is not valid!')
        )
    }

    // const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
    // const passwordReg = /^[A-z][A-z0-9-_]{3,23}$/
    const passwordReg = /^[a-zA-Z0-9]+$/
    if (!(passwordReg.test(req.body.pwd))) {
        return next(
            new ApiError(422, 'Password is not valid!')
        )
    }

    try {
        const [userByUsername, userByEmail] = await Promise.all([
            User.findOne({
                username: req.body.user,
            }),
            User.findOne({
                email: req.body.email,
            }),
        ])

        if (userByUsername) {
            return next(
                new ApiError(422, 'Tên tài khoản đã được sử dụng!')
            )
        }

        if (userByEmail) {
            return next(
                new ApiError(422, 'Địa chỉ email đã được sử dụng!')
            )
        }
        
        return next()
    } catch (error) {
        console.log(error)
        return next(new ApiError(500))
    }
}

module.exports = {
    checkDuplicateUsernameOrEmail,
}
