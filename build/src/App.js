"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../swagger.json"));
const routes_1 = __importDefault(require("./routes"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const emailConstants_1 = require("./constants/emailConstants");
const emailAPI_1 = __importDefault(require("./api/emailAPI"));
const verificationConstants_1 = require("./constants/verificationConstants");
const verifyAPI_1 = __importDefault(require("./api/verifyAPI"));
const patientConstants_1 = require("./constants/patientConstants");
const patientApi_1 = __importDefault(require("./api/patientApi"));
class App {
    async init() {
        this.express = (0, express_1.default)();
        this.httpServer = http_1.default.createServer(this.express);
        // add all global middleware like cors
        this.middleware();
        // // register the all routes
        this.routes();
        // add the middleware to handle error, make sure to add if after registering routes method
        this.express.use(error_handler_1.default);
        // In a development/test environment, Swagger will be enabled.
        if (environment.isDevEnvironment() || environment.isTestEnvironment()) {
            this.setupSwaggerDocs();
        }
    }
    /**
     * here register your all routes
     */
    routes() {
        this.express.get('/', this.basePathRoute);
        this.express.get('/web', this.parseRequestHeader, this.basePathRoute);
        // Email Routers
        this.express.post(emailConstants_1.EMAIL_CONFIRM_ROUTE, this.confirmEmail);
        //Verifcation Routers
        this.express.post(verificationConstants_1.VERIFICAITON, this.verify);
        //Patient Routers
        this.express.post(patientConstants_1.SIGN_IN_ROUTE, this.signin);
        this.express.use('/', (0, routes_1.default)());
    }
    /**
     * here you can apply your middlewares
     */
    middleware() {
        // support application/json type post data
        // support application/x-www-form-urlencoded post data
        // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
        this.express.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
        this.express.use(express_1.default.json({ limit: '100mb' }));
        this.express.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
        // add multiple cors options as per your use
        /*const corsOptions = {
            origin: ['http://localhost:8080/', 'http://example.com/', 'http://127.0.0.1:3146','http://127.0.0.1:3146/login'],
        };*/
        this.express.use((0, cors_1.default)());
    }
    parseRequestHeader(req, res, next) {
        // parse request header
        // console.log(req.headers.access_token);
        next();
    }
    basePathRoute(request, response) {
        response.json({ message: 'base path' });
    }
    confirmEmail(request, response, next) {
        const emailApi = new emailAPI_1.default();
        emailApi.sendEmail(response, request.body.email, request.body.password, next);
    }
    verify(request, response, next) {
        const verifyApi = new verifyAPI_1.default();
        verifyApi.checkAndVerify(response, request.body.verificationId, next);
    }
    signin(request, response, next) {
        const patientAPI = new patientApi_1.default();
        patientAPI.signIn(response, request.body.email, request.body.password, next);
    }
    setupSwaggerDocs() {
        this.express.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map