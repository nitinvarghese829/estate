import User from "../models/user.model.js";
import bcyprtjs from 'bcryptjs'
import {errorHandler} from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashPassword = bcyprtjs.hashSync(password, 10);

    const newUser = new User({username, email, password: hashPassword});
    try{
        await newUser.save();
        res.status(201).json('User created successfullyyy');
    } catch (e) {
        next(errorHandler(e.statusCode, e.message));
    }
}

export const signIn = async (req, res, next) => {
    const {email, password} = req.body;



    try{
        const validUser = await User.findOne({email});

        if(!validUser){
            next(errorHandler(404, 'User not found'));
        }

        const validPassword = bcyprtjs.compareSync(password, validUser.password);
        if(!validPassword) {
            return next(errorHandler(401, 'Invalid Credentials'));
        }

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);

        const {password: pwd,  ...rest} = validUser._doc;
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
    } catch (e) {
        next(errorHandler(e.statusCode, e.message));
    }
}

export const google = async (req, res, next) => {
    console.log(req.body);
    try{
        const user = await User.findOne({email: req.body.email})

        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

            const {password: pwd,  ...rest} = user._doc;
            res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
        } else {
            const generatedPwd = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            console.log("pwd",generatedPwd);
            const hashPwd = bcyprtjs.hashSync(generatedPwd, 10);
            console.log(res.body);
            const newUser = new User({
                username: req.body.name.split(' ').join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashPwd,
                avatar: req.body.photo
            });

            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);

            const {password: pwd,  ...rest} = newUser._doc;
            res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
        }
    } catch (e){
        next(errorHandler(e.statusCode, e.message));
    }
}