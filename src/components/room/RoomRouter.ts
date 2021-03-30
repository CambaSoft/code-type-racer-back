import express from 'express';
import RoomController from './RoomController';

const roomRoutes = express.Router();

roomRoutes.get('/room/new', RoomController.create);
roomRoutes.post('/room/auth', RoomController.auth);
roomRoutes.get('/room/join/:code', RoomController.join);

export = roomRoutes;