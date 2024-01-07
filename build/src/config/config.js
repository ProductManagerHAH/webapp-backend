"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function initDBConnection(callback) {
    // Set up mongoose connection
    const mongoDB = process.env.MONGODB_URI;
    mongoose_1.default.connect(mongoDB);
    mongoose_1.default.Promise = global.Promise;
    const db = mongoose_1.default.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.on('error', () => {
        console.log('Failed to connect to database');
        process.exit(1);
    });
    db.once('open', () => {
        console.log('Connected to database');
        callback();
    });
}
exports.default = initDBConnection;
;
//# sourceMappingURL=config.js.map