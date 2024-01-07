"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHTMLFile = void 0;
const fs_1 = __importDefault(require("fs"));
const readHTMLFile = (path, callback) => {
    fs_1.default.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};
exports.readHTMLFile = readHTMLFile;
//# sourceMappingURL=readHtml.js.map