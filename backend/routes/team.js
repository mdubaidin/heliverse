import express from 'express';
import fetch from '../controllers/team/fetch.js';
import create from '../controllers/team/create.js';
import update from '../controllers/team/update.js';
import _delete from '../controllers/team/delete.js';

const teamRouter = new express.Router();

// GET
teamRouter.get('/', fetch);
teamRouter.get('/:id', fetch);

// POST
teamRouter.post('/', create);

// PUT
teamRouter.put('/:id', update);

// DELETE
teamRouter.delete('/:id', _delete);

export default teamRouter;
