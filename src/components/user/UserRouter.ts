import express from 'express';
import UserController from './UserController';

const userRoutes = express.Router();

userRoutes.get('/user/new', UserController.create);
// userRoutes.post('/user/change-username', UserController.update);

export = userRoutes;