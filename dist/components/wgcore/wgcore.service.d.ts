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
    getAllPeers(): Promise<{
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
    createNewPeer(peer: CreatePeerDTO): Promise<void>;
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
    regenWgConf(): Promise<void>;
    genPeerKeys(): {
        PrivateKey: string;
        PublicKey: string;
        PresharedKey: string;
    };
    genPeerConfig(peer: PeerDTO): string;
    genPeerConnectConfig(peer: PeerDTO): string;
    getNewPeerId(): Promise<number>;
}
