const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    // User registration api
    userRegister: async (req, res) => {
        const { name, email, password,dob } = req.body;
        const user = await User.findOne({ where: { email: email } })

        if (user) {
            return res.json({ "status": "failed", "message": "Email already exist, please try another email " })
        }
        else {
            if (name && email && password && dob) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt)

                await User.create({
                    name: name,
                    email: email,
                    password: hashPassword,
                    dob: dob,
                });
                const saved_user = await User.findOne({ where: { email: email } })

                //Generate jwt token
                const token = jwt.sign({ userId: saved_user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })

                return res.json({ "status": "success", "message": "User register successfully ", "token": token })
            }

            else {
                return res.json({ "status": "failed", "message": "All fields are compalsary" });
            }
        }
    },

    // User login api
    userLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email: email } })

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password)
                if ((user.email === email) && isMatch) {
                    const saved_user = await User.findOne({ where: { email: email } })

                    //Generate jwt token
                    const token = jwt.sign({ userId: saved_user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                    return res.json({ "status": "success", "message": "Login success", "token": token })
                }
                else {
                    return res.json({ "status": "failed", "message": "Email or password is not valid" })
                }
            }
            else {
                return res.json({ "status": "failed", "message": "You are not a registered user" })
            }
        }
        catch (error) {
            console.log(error, "i am error")
            return res.json({ "status": "failed", "message": "Somethimg went wrong!" })
        }

    },

    //CHANGE PASSWORD API

    changePassword: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } })
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        if (user) {
            const users = await User.update(
                {
                    password: hashPassword,
                },
                {
                    where: {
                        email: email,
                    },
                }
            );
            res.json({ Message: "Password changed successfully " });
        }
        else {
            res.json({ Message: "Unauthorized access " });
        }
    },

    sendUserPasswordEmail: async (req, res) => {
        const { email } = req.body;
        if (email) {
            const user = await User.findOne({ where: { email: email } })
            const secret = user.id + process.env.JWT_SECRET_KEY

            // console.log(user.id,"heyy user",process.env.JWT_SECRET_KEY)

            if (user) {
                const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '15m' })
                const link = `http://127.0.0.1:3000/api/user/reset/${user.id}/${token}`
                console.log(link)
                res.send({ "status": "success", "message": "Email has been sent in your email" })
            }
            else {
                res.send({ "status": "failed", "message": "User does not exist" })
            }
        }
        else {
            req.send({ "status": "failed", "message": "email field is required" })
        }
    }

};
