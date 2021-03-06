const apiRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const {JWT_SECRET = 'neverTell'} = process.env;
const {getUserById} = require('../db/index');

//authorization middleware
apiRouter.use(async (req, res, next) => {
  try {
    const authorization = req.header('Authorization');
    
    //if no authorization is present, nothing to see
    if(!authorization) {
      next();
    //if authorization present, get the userObject
    } else {
      const [_, token] = authorization.split(' ');
      const userObject = jwt.verify(token, JWT_SECRET);
      let user = {}
      
      if (!userObject.id) {
        next();
      } else {
        user = await getUserById(userObject.id);        
      }

      req.user = user;
      next();
    }
  } catch(error) {
    next(error)
  }
});

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

const order_productsRouter = require('./order_products');
apiRouter.use('/order_products', order_productsRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;
