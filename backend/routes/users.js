import express from 'express';
import fetch from '../controllers/users/fetch.js';
import create from '../controllers/users/create.js';
import update from '../controllers/users/update.js';
import _delete from '../controllers/users/delete.js';

const usersRouter = new express.Router();

// GET
usersRouter.get('/', fetch);
usersRouter.get('/:id', fetch);

// POST
usersRouter.post('/', create);

// PUT
usersRouter.put('/:id', update);

// DELETE
usersRouter.delete('/:id', _delete);

export default usersRouter;
