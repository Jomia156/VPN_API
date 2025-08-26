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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerController = void 0;
const common_1 = require("@nestjs/common");
const peer_service_1 = require("./peer.service");
let PeerController = class PeerController {
    peerService;
    constructor(peerService) {
        this.peerService = peerService;
    }
    async getAll(req, res) {
        const result = {
            status: 200,
            data: await this.peerService.getAllPeers()
        };
        res.status(result.status).json(result);
    }
    async getByFilter(req, res, filter) {
        const result = {
            status: 200,
            data: await this.peerService.getPeersByFilter({ ...filter })
        };
        res.status(result.status).json(result);
    }
    async getById(req, res, params) {
        const result = {
            status: 204,
            data: await this.peerService.removePeer(params.id)
        };
        res.status(result.status).json(result);
    }
    async create(createPeerDTO, req, res) {
        const result = {
            status: 204,
            data: await this.peerService.create(createPeerDTO.peerName, createPeerDTO.shelflife)
        };
        res.status(result.status).json(result);
    }
    async update(updatePeerDTO, req, res) {
        const result = {
            status: 204,
            data: await this.peerService.updatePeer(updatePeerDTO)
        };
        res.status(result.status).json(result);
    }
};
exports.PeerController = PeerController;
__decorate([
    (0, common_1.Get)("/all"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PeerController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/filter'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PeerController.prototype, "getByFilter", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PeerController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PeerController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("update"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PeerController.prototype, "update", null);
exports.PeerController = PeerController = __decorate([
    (0, common_1.Controller)('peer'),
    __metadata("design:paramtypes", [peer_service_1.PeerService])
], PeerController);
//# sourceMappingURL=peer.controller.js.map