import express, {Express, Router} from 'express';
import bodyParser from 'body-parser';
import asyncHandler from 'express-async-handler';
import {TemplateContractServiceInstance} from './services/template-contract.service';

export class AppServer {
    app: Express;
    port: number = 3001;

    constructor() {
        this.app = express();
    }

    async setup(): Promise<void> {
        await this.applyMiddleware();
        this.app.use(this.getRouter());
        await TemplateContractServiceInstance.setup();
        this.app.listen(this.port, async () => {
            console.log('Listening on port ' + this.port);
        });
    }

    private async applyMiddleware(): Promise<void> {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    private getRouter(): Router {
        const router: Router = express.Router();
        router.get('/ping', asyncHandler(async (_, res) => {
            res.send();
        }));
        router.get('/accounts', asyncHandler(async (_, res) => {
            const accounts = await TemplateContractServiceInstance.getAccounts();
            res.send(accounts);
        }));
        router.get('/contract/ping', asyncHandler(async (_, res) => {
            const result = await TemplateContractServiceInstance.contractPing();
            res.send(result);
        }));
        router.get('/contract/number', asyncHandler(async (_, res) => {
            const result = await TemplateContractServiceInstance.getNumber();
            res.send(result);
        }));
        router.post('/contract/number', asyncHandler(async (req, res) => {
            const value: number = req.body.value;
            await TemplateContractServiceInstance.setNumber(value);
            res.send();
        }));
        return router;
    }
}

