"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerController = void 0;
const common_1 = require("@nestjs/common");
const peer_service_1 = require("./peer.service");
const custom_error_class_1 = require("../components/error-handler/custom-error.class");
function errorHandler() {
    return function (target, name, descriptor) {
        let origin = descriptor.value;
        descriptor.value = async function () {
            try {
                const result = await origin.apply(this, arguments);
                return { data: result };
            }
            catch (e) {
                if (e instanceof custom_error_class_1.CustomError) {
                    console.log(target.constructor.name, name, "->>>", e.msg);
                    return {
                        status: e.status,
                        description: e.msg
                    };
                }
                console.log(target.constructor.name, name, "->>>", e);
                return {
                    status: 500,
                    description: "Ошибка VPN сервера."
                };
            }
        };
        return descriptor;
    };
}
let PeerController = class PeerController {
    peerService;
    constructor(peerService) {
        this.peerService = peerService;
    }
    async getAll(req, res) {
        return await this.peerService.getAllPeers();
    }
};
exports.PeerController = PeerController;
__decorate([
    (0, common_1.Get)("/all"),
    errorHandler(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof common_1.Responce !== "undefined" && common_1.Responce) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], PeerController.prototype, "getAll", null);
exports.PeerController = PeerController = __decorate([
    (0, common_1.Controller)('peer'),
    __metadata("design:paramtypes", [peer_service_1.PeerService])
], PeerController);
//# sourceMappingURL=peer.controller.js.map