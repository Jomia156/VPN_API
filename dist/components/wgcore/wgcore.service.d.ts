import { CreatePeerDTO, FilterDTO, UpdatePeerDTO, PeerDTO } from './wgcore.dto';
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
    _regenWgConf(): Promise<void>;
    _getNewPeerId(): Promise<number>;
    _genPeerKeys(): Promise<{
        PrivateKey: string;
        PublicKey: string;
        PresharedKey: string;
    }>;
    _genPeerConfig(peer: PeerDTO): Promise<string>;
    _genPeerConnectConfig(peer: PeerDTO): Promise<string>;
    getAllPeers(): Array<PeerDTO>;
    createNewPeer(peer: CreatePeerDTO): Promise<{
        id: number;
        peerName: string;
        PrivateKey: string;
        PublicKey: string;
        PresharedKey: string;
        AllowedIPs: string;
        created_date: Date;
        shelflife: Date;
        banned: boolean;
    }>;
    getPeersByFilter(filter: FilterDTO): Promise<{
        id: number;
        peerName: string;
        PrivateKey: string;
        PublicKey: string;
        PresharedKey: string;
        AllowedIPs: string;
        created_date: Date;
        shelflife: Date;
        banned: boolean;
    }[] | never[]>;
    updatePeer(updatePeerData: UpdatePeerDTO): Promise<void>;
    removePeer(id: any): Promise<void>;
    create(name: any, shelflife: any): Promise<string>;
}
