class Config {
    PRODUCTION = process.env.PRODUCTION === 'true' || false;
    SERVER = {
        HOST: process.env.HOST || 'http://localhost',
        PORT: + (process.env.PORT || 3000),
        URL: '',
        SECRET_SALT_OR_ROUNDS_COUNT: + (process.env.SECRET_SALT_OR_ROUNDS_COUNT || 1)
    }
    MONGO_DB = {
        USERNAME: process.env.MONGO_USERNAME || 'mongo_username',
        PASSWORD: process.env.MONGO_PASSWORD || 'mongo_password',
        HOST: process.env.MONGO_HOST || `mongo_host`,
        PORT: +(process.env.MONGO_PORT || 5432),
        NAME: process.env.MONGO_NAME || 'mongo_name',
        CONNECTION_STRING: '',
        OPTIONS: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
    PUSHER = {
        PUSHER_APP_ID: process.env.PUSHER_APP_ID || 'id',
        PUSHER_APP_KEY: process.env.PUSHER_APP_KEY || 'key',
        PUSHER_APP_SECRET: process.env.PUSHER_APP_SECRET || 'secret',
        PUSHER_APP_CLUSTER: process.env.PUSHER_APP_CLUSTER || 'cluster'
    }


    constructor() {
        this.MONGO_DB.CONNECTION_STRING =
            `mongodb+srv://${this.MONGO_DB.USERNAME}:${this.MONGO_DB.PASSWORD}@${this.MONGO_DB.HOST}/${this.MONGO_DB.NAME}?retryWrites=true&w=majority`;
        this.SERVER.URL =
            `${this.SERVER.HOST}`;
        if (this.PRODUCTION === false) {
            this.SERVER.URL += `:${this.SERVER.PORT}`
        }
    }
}

export = new Config();