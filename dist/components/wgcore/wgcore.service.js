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
exports.WgcoreService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WgcoreService = class WgcoreService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
        const date = new Date().toISOString();
        this._createNewPeer({
            id: "test2",
            peerName: "test2",
            publicKey: "randKey1",
            PresharedKey: "randKey2",
            AllowedIps: "1.1.1.3",
            shelflife: date
        });
        this._getPeerByFilter({ peerName: "test" }).then(data => console.log(data));
        this._removePeer("test");
    }
    async _getAllPeers() {
        return await this.prisma.peer.findMany().catch(e => []);
    }
    async _createNewPeer(peerData) {
        await this.prisma.peer.create({ data: peerData }).catch(e => e.data);
    }
    async _getPeerByFilter(filter) {
        return await this.prisma.peer.findMany({ where: filter }).catch(e => []);
    }
    async _updatePeer(updatePeerData) {
        await this.prisma.peer.update({ where: { peerName: updatePeerData.id }, data: updatePeerData });
    }
    async _removePeer(id) {
        await this.prisma.peer.delete({ where: { id } }).catch(e => null);
    }
};
exports.WgcoreService = WgcoreService;
exports.WgcoreService = WgcoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WgcoreService);
//# sourceMappingURL=wgcore.service.js.map