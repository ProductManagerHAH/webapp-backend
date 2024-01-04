import cors from 'cors';
import express, { NextFunction, Router } from 'express';
import http from 'http';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json'
import registerRoutes from './routes';
import addErrorHandler from './middleware/error-handler';
import { EMAIL_CONFIRM_ROUTE } from './constants/emailConstants';
import EmailConfirmationAPI from './api/emailAPI';
import { VERIFICAITON } from './constants/verificationConstants';
import VerifyApi from './api/verifyAPI';
import { SIGN_IN_ROUTE } from './constants/patientConstants';
import PatientApi from './api/patientApi';



export default class App {
    public express: express.Application;

    public httpServer: http.Server;

    public async init(): Promise<void> {
        this.express = express();
        this.httpServer = http.createServer(this.express);

        // add all global middleware like cors
        this.middleware();

        // // register the all routes
        this.routes();

        // add the middleware to handle error, make sure to add if after registering routes method
        this.express.use(addErrorHandler);

        // In a development/test environment, Swagger will be enabled.
        if (environment.isDevEnvironment() || environment.isTestEnvironment()) {
            this.setupSwaggerDocs();
        }
    }

    /**
     * here register your all routes
     */
    private routes(): void {
        this.express.get('/', this.basePathRoute);
        this.express.get('/web', this.parseRequestHeader, this.basePathRoute);

        // Email Routers
         this.express.post(EMAIL_CONFIRM_ROUTE, this.confirmEmail);


         //Verifcation Routers
         this.express.post(VERIFICAITON, this.verify);


         //Patient Routers
         this.express.post(SIGN_IN_ROUTE, this.signin);

        
        this.express.use('/', registerRoutes());
    }

    /**
     * here you can apply your middlewares
     */
    private middleware(): void {
        // support application/json type post data
        // support application/x-www-form-urlencoded post data
        // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
        this.express.use(helmet({ contentSecurityPolicy: false }));
        this.express.use(express.json({ limit: '100mb' }));
        this.express.use(express.urlencoded({ limit: '100mb', extended: true }));
        // add multiple cors options as per your use
        /*const corsOptions = {
            origin: ['http://localhost:8080/', 'http://example.com/', 'http://127.0.0.1:3146','http://127.0.0.1:3146/login'],
        };*/
        this.express.use(cors());
    }

    private parseRequestHeader(req: express.Request, res: express.Response, next: Function): void {
        // parse request header
        // console.log(req.headers.access_token);
        next();
    }

    private basePathRoute(request: express.Request, response: express.Response): void {
        response.json({ message: 'base path' });
    }

    private confirmEmail(request: express.Request, response: express.Response,next: NextFunction): void {
       const emailApi = new EmailConfirmationAPI();
        emailApi.sendEmail(response, request.body.email,request.body.password, next);

    }

    private verify(request: express.Request, response: express.Response,next: NextFunction): void {
       const verifyApi = new VerifyApi();
        verifyApi.checkAndVerify(response, request.body.verificationId, next);

    }

    private signin(request: express.Request, response: express.Response,next: NextFunction): void {
       const patientAPI = new PatientApi();
        patientAPI.signIn(response, request.body.email, request.body.password, next);

    }

   

    private setupSwaggerDocs(): void {
        this.express.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }


}
