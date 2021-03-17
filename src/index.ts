import dotenv from "dotenv";
dotenv.config();

import CONFIG from './config/Config';
import Activity from './config/Activity';
import Server from "./server";
import mongoose from 'mongoose';

Activity.info("\nConnecting to db...\n");

mongoose
    .connect(
        CONFIG.MONGO_DB.CONNECTION_STRING,
        CONFIG.MONGO_DB.OPTIONS
    )
    .then(() => {
        Activity.info("Connected to db.");
        Activity.info("Starting app...");
        startApp();
    })
    .catch(error => {
        Activity.error(error);
        Activity.info('App not started.');
    });

const startApp = () => {
    try {
        const server: Server = new Server(CONFIG.SERVER.PORT);
        server.start(() => {
            Activity.info("App started.");
            Activity.info(`App listening at ${CONFIG.SERVER.URL}`);
        });
    } catch (error) {
        Activity.error('Error starting app...\n' + error);
    }
}