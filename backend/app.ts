import bodyParser from 'body-parser';
import { NextFunction, Request, Response } from "express";
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import cors, { CorsOptions } from 'cors';
import { AddressInfo } from 'net';
import { createServer } from 'http';
import { initializeIO, SocketIO } from '@app/helpers/socketioHelper';
import { bootstrapSocketIoService } from '@app/services/socketioService';
import app_config from '@configs/app_config';

const app = express();
app.use(cookieParser("superdupersecret"));

app.use(
    cookieSession({ name: "session", keys: ["superdupersecret"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const whitelist = ['http://localhost:3000', 'http://localhost:8000'];
const corsOptions: CorsOptions = {
    credentials: true,
    origin: function (origin: string | undefined, callback: Function) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));

const httpServer = createServer(app);

initializeIO(httpServer).then((io) => {
    bootstrapSocketIoService(io as SocketIO).then(() => {
        console.log('WebSocket Initialized');
    }).catch(err => {throw err});
}).catch(err => console.error(err));

app.get('/', (req: Request, res: Response) => {
    res.send(`Application ${process.env.port}`);
})

const server = httpServer.listen(process.env.port || app_config.port || 8001, () => {
    let binding: string | number | AddressInfo | null;
    if(typeof server.address() === 'string'){
        binding = server.address();
    }else{
        let addr = server.address() as AddressInfo;
        binding = addr.port;
    }
    console.log(`Listening Backend API on port ${binding}`);
});

// console.log(require('crypto').randomBytes(64).toString('hex'));
