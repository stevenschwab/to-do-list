const express = require('express');

const router = express.Router();

const { create, read, removeTodo, updateTodo } = require('../controller');

router.post('/todo/create', create);

router.get('/todos', read);

router.put('/todo/:id', updateTodo);

router.delete('/todo/:id', removeTodo);

module.exports = router;