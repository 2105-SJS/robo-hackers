const express = require('express');
const usersRouter = express.Router();

const {
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUser
} = require('../db/index.js')

const jwt = require('jsonwebtoken');

usersRouter.use((req, res, next) => {
    next();
})

