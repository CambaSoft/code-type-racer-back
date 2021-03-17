
import { Response } from 'express';

class Controller {

    send = (res: Response, code: number, msg: string, body: any) => {
        return res.status(code).json({
            message: msg,
            body
        });
    }

}

export = Controller;