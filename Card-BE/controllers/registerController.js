const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, email, pwd } = req.body;
    if (!user || !email || !pwd) return res.status(400).json({ 'message': 'Username, email and password are required.' });

    if (req.body?.user.length < 5) {
        return res.send({ message: 'Tên tài khoản phải có ít nhất 5 ký tự!', status: 200 });
    }

    if (req.body?.pwd.length < 8) {
        return res.send({ message: 'Mật khẩu phải có ít nhất 8 ký tự!', status: 400 });
    }

    const foundUser = await User.findOne({ username: user }).exec();
    if (foundUser) {
        return res.send({ message: 'Account already exists!', status: 400 })
    }

    const foundEmail = await User.findOne({ email: email }).exec();
    if (foundEmail) {
        return res.send({ message: 'This email address is already in use!', status: 400 })
    }
    
    // check for duplicate usernames in the db
    // const duplicate = await User.findOne({ username: user }).exec();
    // if (duplicate) return res.SendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 8);

        //create and store the new user
        const result = await User.create({
            "username": user,
            "email": email,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).send({ message: `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };