const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User.Model');
const { getAllTodos, addTodo, updateTodoStatus, deleteTodo } = require('../controllers/todoController');


// authorizing the user with the jwt token 
async function authenticateToken(req, res, next) {
 
  const token = req.cookies.token;
  
  if (!token) return res.status(401).json({message:"token not provided"});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: "invalid token"});
        req.user = user;
        next();
    });
}

// Protected route it can be only accessible by jwt token verification

router.get('/users/:id/todos', authenticateToken, getAllTodos)

router.post('/users/:id/todos', authenticateToken, addTodo)

router.patch('/users/:id/todos', authenticateToken, updateTodoStatus)

router.delete('/users/:id/todos', authenticateToken, deleteTodo)



module.exports = router;