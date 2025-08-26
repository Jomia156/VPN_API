import { PeerDTO } from './wgcore.dto';
import { PrismaService } from "../prisma/prisma.service";
export declare class WgcoreService {
    private prisma;
    private wgConfHeader;
    private wgConfPath;
    private wgServerIp;
    private wgServerPort;
    private wgPublicKey;
    private wgPrivateKey;
    constructor(prisma: PrismaService);
    _reloadWGConf(): Promise<void>;
    _regenWgConf(activePeers: Array<PeerDTO>): Promise<void>;
    _genPeerKeys(): Promise<{
        PrivateKey: string;
        PublicKey: string;
        PresharedKey: string;
    }>;
    _genPeerConfig(peer: PeerDTO): Promise<string>;
    _genPeerConnectConfig(peer: PeerDTO): Promise<string>;
}
