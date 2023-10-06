import User from "../models/user.model.js";
import bcyprtjs from 'bcryptjs'
import {errorHandler} from "../utils/error.js";

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