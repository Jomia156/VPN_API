import { CreatePeerDTO, FilterDTO, UpdatePeerDTO } from './wgcore.dto';
import { PrismaService } from "../prisma/prisma.service";
export declare class WgcoreService {
    private prisma;
    private wgConfHeader;
    private wgConfPath;
    constructor(prisma: PrismaService);
    _getAllPeers(): Promise<{
        peerName: string;
        PublicKey: string;
        PresharedKey: string;
        AllowedIPs: string;
        created_date: Date;
        shelflife: Date;
        banned: boolean;
    }[] | never[]>;
    _createNewPeer(peerData: CreatePeerDTO): Promise<void>;
    _getPeersByFilter(filter: FilterDTO): Promise<{
        peerName: string;
        PublicKey: string;
        PresharedKey: string;
        AllowedIPs: string;
        created_date: Date;
        shelflife: Date;
        banned: boolean;
    }[] | never[]>;
    _updatePeer(updatePeerData: UpdatePeerDTO): Promise<void>;
    _removePeer(id: any): Promise<void>;
    regenWgConf(): Promise<void>;
}
