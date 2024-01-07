"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const system_status_controller_1 = __importDefault(require("./components/system-status/system-status.controller"));
/**
 * Here, you can register routes by instantiating the controller.
 *
 */
function registerRoutes() {
    const router = (0, express_1.Router)();
    // System Status Controller
    const systemStatusController = new system_status_controller_1.default();
    router.use('/api/status', systemStatusController.register());
    return router;
}
exports.default = registerRoutes;
//# sourceMappingURL=routes.js.map