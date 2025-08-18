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
const wgcore_service_1 = require("../components/wgcore/wgcore.service");
let PeerController = class PeerController {
    wgcoreService;
    constructor(wgcoreService) {
        this.wgcoreService = wgcoreService;
    }
    async getAll(req, res) {
        return await this.wgcoreService.getAllPeers();
    }
};
exports.PeerController = PeerController;
__decorate([
    (0, common_1.Get)("/all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof common_1.Responce !== "undefined" && common_1.Responce) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], PeerController.prototype, "getAll", null);
exports.PeerController = PeerController = __decorate([
    (0, common_1.Controller)('peer'),
    __metadata("design:paramtypes", [wgcore_service_1.WgcoreService])
], PeerController);
//# sourceMappingURL=peer.controller.js.map