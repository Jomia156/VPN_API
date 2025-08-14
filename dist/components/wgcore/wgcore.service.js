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
    wgServerIp;
    wgServerPort;
    wgPublicKey;
    wgPrivateKey;
    constructor(prisma) {
        this.prisma = prisma;
        this.wgConfHeader = ((0, fs_1.readFileSync)(process.env.WGHeaderPath || "")).toString();
        this.wgConfPath = process.env.WGConfPath || "";
        this.wgServerIp = process.env.WGServerIp || "";
        this.wgServerPort = Number(process.env.WGServerPort) || 0;
        this.wgPublicKey = process.env.WGPublicKey || "";
        this.wgPrivateKey = process.env.WGPrivateKey || "";
        this.removePeer(1);
        this.getNewPeerId().then(data => console.log(data));
        this.getAllPeers().then(data => console.log(data));
    }
    async getAllPeers() {
        return await this.prisma.peer.findMany().catch(e => []);
    }
    async createNewPeer(peer) {
        await this.prisma.peer.create({ data: peer }).catch(e => e.data);
    }
    async getPeersByFilter(filter) {
        return await this.prisma.peer.findMany({ where: filter }).catch(e => []);
    }
    async updatePeer(updatePeerData) {
        await this.prisma.peer.update({ where: { id: updatePeerData.id }, data: updatePeerData });
    }
    async removePeer(id) {
        await this.prisma.peer.delete({ where: { id } }).catch(e => null);
    }
    async regenWgConf() {
        const activePeers = await this.getPeersByFilter({ banned: false });
        let allPeers = this.wgConfHeader;
        activePeers.forEach(peer => {
            allPeers += `\n\n[Peer]\nPublicKey=${peer.PublicKey}\nPresharedKey=${peer.PresharedKey}\nAllowedIPs=${peer.AllowedIPs}`;
        });
        (0, fs_1.writeFileSync)(this.wgConfPath, allPeers);
    }
    genPeerKeys() {
        let commandForGenKeys = 'wg genkey | tee private.key | wg pubkey > public.key && cat private.key && cat public.key && wg genpsk && rm public.key private.key';
        let output = (0, child_process_1.execSync)(commandForGenKeys).toString();
        return {
            PrivateKey: output.split("\n")[0],
            PublicKey: output.split("\n")[1],
            PresharedKey: output.split("\n")[2]
        };
    }
    genPeerConfig(peer) {
        let peerString = "[Peer]";
        peerString += "\nPublicKey=" + peer.PublicKey;
        peerString += "\nPresharedKey=" + peer.PresharedKey;
        peerString += "\nAllowedIPs=" + peer.AllowedIPs;
        return peerString;
    }
    genPeerConnectConfig(peer) {
        let clientConfigString = "[Interface]";
        clientConfigString += "\nPrivateKey=" + peer.PrivateKey;
        clientConfigString += "\nAddress=" + peer.AllowedIPs;
        clientConfigString += "\nDNS=1.1.1.1,8.8.8.8";
        clientConfigString += "\n\n[Peer]";
        clientConfigString += "\nPublicKey=" + this.wgPublicKey;
        clientConfigString += "\nPresharedKey=" + peer.PresharedKey;
        clientConfigString += "\nEndpoint=" + this.wgServerIp + ":" + this.wgServerPort;
        clientConfigString += "\nAllowedIPs=0.0.0.0/0,::/0";
        return clientConfigString;
    }
    async getNewPeerId() {
        return await this.prisma.peer.findMany({ orderBy: { id: "asc" }, select: { id: true }, take: -1 }).then(data => (data[0]?.id | 0) + 1);
    }
};
exports.WgcoreService = WgcoreService;
exports.WgcoreService = WgcoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WgcoreService);
//# sourceMappingURL=wgcore.service.js.map