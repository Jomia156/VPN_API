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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../components/prisma/prisma.service");
const wgcore_service_1 = require("../components/wgcore/wgcore.service");
const custom_error_class_1 = require("../components/error-handler/custom-error.class");
let PeerService = class PeerService {
    prisma;
    wgcore;
    constructor(prisma, wgcore) {
        this.prisma = prisma;
        this.wgcore = wgcore;
    }
    async _getNewPeerId() {
        return await this.prisma.peer.findMany({
            orderBy: {
                id: "asc"
            },
            select: {
                id: true
            },
            take: -1
        }).then(data => (data[0]?.id | 0) + 2).catch((e) => { throw new custom_error_class_1.CustomError(500, "Ошибка VPN сервера.", e); });
    }
    async getAllPeers() {
        return await this.prisma.peer.findMany().catch((e) => { throw new custom_error_class_1.CustomError(500, "Ошибка VPN сервера.", e); });
    }
    async getPeersByFilter(filter) {
        let result = [];
        await this.prisma.peer.findMany({
            where: filter
        }).then((data) => { result = data; }).catch((e) => { []; });
        return result;
    }
    async updatePeer(updatePeerData) {
        await this.prisma.peer.update({
            where: {
                id: updatePeerData.id
            },
            data: updatePeerData
        }).catch((e) => { throw new custom_error_class_1.CustomError(404, "Пользователь для изменения не найден.", e); });
    }
    async removePeer(id) {
        await this.prisma.peer.delete({
            where: {
                id
            }
        }).catch((e) => { throw new custom_error_class_1.CustomError(404, "Пользователь для удаления не найден.", e); });
    }
    async create(name, shelflife) {
        const created = (await this.getPeersByFilter({ peerName: name })).length;
        if (created) {
            throw new custom_error_class_1.CustomError(406, "Пользователь с таким именем уже существует.", {});
        }
        const id = await this._getNewPeerId();
        const peerKeys = await this.wgcore._genPeerKeys();
        const peerData = {
            peerName: name,
            shelflife: shelflife,
            AllowedIPs: `10.66.66.${id}/32,fd42:42:42::${id}/128`,
            ...peerKeys
        };
        await this.prisma.peer.create({
            data: peerData
        }).catch((e) => { throw new custom_error_class_1.CustomError(500, "Ошибка VPN сервера.", e); });
        await this.wgcore._regenWgConf(await this.getPeersByFilter({ banned: false }));
        return await this.wgcore._genPeerConnectConfig(peerData);
    }
};
exports.PeerService = PeerService;
exports.PeerService = PeerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        wgcore_service_1.WgcoreService])
], PeerService);
//# sourceMappingURL=peer.service.js.map