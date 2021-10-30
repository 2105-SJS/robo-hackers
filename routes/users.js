const express = require('express');
const usersRouter = express.Router();

const {
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUser,
    createUser
} = require('../db/index.js')

const jwt = require('jsonwebtoken');


const { getOrderById, getOrdersByUser } = require('../db/orders.js');

usersRouter.use((req, res, next) => {
    next();
})

usersRouter.get('/', async (req, res, next) => {
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

usersRouter.get('/:userId/orders', async(req, res, next) => {
    console.log(req.params.userId);
    try {
        const { userId } = req.params;
        console.log('userId', userId);
        const getOrders = await getOrdersByUser({userId}) 
        res.send(getOrders)
    } catch ({name, message}){
        next({name, message}); 
        
    }
});

module.exports = usersRouter;