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
const child_process_1 = require("child_process");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs_1 = require("fs");
let WgcoreService = class WgcoreService {
    prisma;
    wgConfHeader;
    wgConfPath;
    constructor(prisma) {
        this.prisma = prisma;
        this.wgConfHeader = ((0, fs_1.readFileSync)(process.env.WGHeaderPath || "")).toString();
        this.wgConfPath = process.env.WGConfPath || "";
        const date = new Date().toISOString();
        this._createNewPeer({
            peerName: "test2",
            PublicKey: "randKey1",
            PresharedKey: "randKey2",
            AllowedIPs: "1.1.1.3",
            shelflife: date
        });
        this._getPeersByFilter({ peerName: "test" }).then(data => console.log(data));
        this._removePeer("test");
        this.regenWgConf();
        console.log(this._genPeerConfigObject());
    }
    async _getAllPeers() {
        return await this.prisma.peer.findMany().catch(e => []);
    }
    async _createNewPeer(peerData) {
        await this.prisma.peer.create({ data: peerData }).catch(e => e.data);
    }
    async _getPeersByFilter(filter) {
        return await this.prisma.peer.findMany({ where: filter }).catch(e => []);
    }
    async _updatePeer(updatePeerData) {
        await this.prisma.peer.update({ where: { peerName: updatePeerData.id }, data: updatePeerData });
    }
    async _removePeer(id) {
        await this.prisma.peer.delete({ where: { peerName: id } }).catch(e => null);
    }
    async regenWgConf() {
        const activePeers = await this._getPeersByFilter({ banned: false });
        let allPeers = this.wgConfHeader;
        activePeers.forEach(peer => {
            allPeers += `\n\n[Peer]\nPublicKey=${peer.PublicKey}\nPresharedKey=${peer.PresharedKey}\nAllowedIPs=${peer.AllowedIPs}`;
        });
        (0, fs_1.writeFileSync)(this.wgConfPath, allPeers);
    }
    _genPeerConfigObject() {
        let commandForGenKeys = 'wg genkey | tee private.key | wg pubkey > public.key && cat private.key && cat public.key && wg genpsk && rm public.key private.key';
        let output = (0, child_process_1.execSync)(commandForGenKeys).toString();
        return {
            PrivateKey: output.split("\n")[0],
            PublicKey: output.split("\n")[1],
            PresharedKey: output.split("\n")[2]
        };
    }
};
exports.WgcoreService = WgcoreService;
exports.WgcoreService = WgcoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WgcoreService);
//# sourceMappingURL=wgcore.service.js.map