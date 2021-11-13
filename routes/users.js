const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcrypt');

const {
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUser,
    createUser,
    getOrdersByUser,
    getOrderById,
    updateUser
} = require('../db/index.js')

const {requireAdmin, requireUser} = require('./utils');

const jwt = require('jsonwebtoken');


usersRouter.use((req, res, next) => {
    next();
})

usersRouter.get('/', requireUser, requireAdmin, async (req, res, next) => {

    try {
        const users = await getAllUsers();

        res.send({
            users: users
        });

    } catch({name , message}) {
        throw({name, message})
    }
})

usersRouter.post('/register', async (req, res, next) => {
    const {username, password, firstName, lastName, email, isAdmin} = req.body;

    try {

        const _user = await getUserByUsername(username);

        if (_user) {
            res.status(400);
            throw({
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            });
        }

        if (password.length < 8) {
            res.status(400);
            throw({
                name: "InvalidPassword",
                message: "Password must be longer than 8 characters"
            })
        }

        const user = await createUser({username, password, lastName, firstName, email, isAdmin});

        const token = jwt.sign({
            id: user.id,
            username
            }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: "thank you for signing up",
            token,
            user
        });

    } catch ({name, message}){
        next({name, message});
    }
});

usersRouter.post('/login', async (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    }

    try {
        const user = await getUserByUsername(username);
        const token = jwt.sign(user, process.env.JWT_SECRET);

        const checkPass = await bcrypt.compare(password, user.password);
        delete user.password;
        if(user && checkPass) {
            res.send({token, user});
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch({name, message}) {
        next({name, message});
    }
})

usersRouter.get('/me', async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    
    try {
        if (!bearerToken) {
            res.status(400);
            next({
                name: 'InvalidToken',
                message: 'no token was provided in header'
            })
        }
        //getting just the actual token without 'bearer' in front
        const token = bearerToken.slice(7);
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        const userData = await getUserById(verifiedToken.id);
        res.send(userData);

    } catch({name, message}){
        next({name, message})
    }
})


usersRouter.get('/:userId/orders', async(req, res, next) => {
    try {
        const { userId } = req.params;
        const getOrders = await getOrdersByUser({userId}) 
        res.send(getOrders)
    } catch ({name, message}){
        next({name, message}); 
        
    }
});

usersRouter.patch('/:userId', requireAdmin, async(req, res, next) => {
    const {userId} = req.params;
    const {username, password, firstName, lastName, imageURL, email, isAdmin} = req.body;

    try {
        const id = userId;
        const updatedUser = await updateUser({id, username, password, firstName, lastName, imageURL, email, isAdmin})
        res.send({
            name:"success!",
            message:"you've updated the user"
        });

    } catch({name, message}) {
        next({name, message})
    }
});

module.exports = usersRouter