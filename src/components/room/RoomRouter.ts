import express from 'express';
import RoomController from './RoomController';

const roomRoutes = express.Router();

roomRoutes.get('/room/new', RoomController.create);
roomRoutes.get('/room/:code', RoomController.verify);
roomRoutes.post('/room/auth/:code', RoomController.auth);
roomRoutes.post('/room/:code/change-username', RoomController.changeUsername);

export = roomRoutes;