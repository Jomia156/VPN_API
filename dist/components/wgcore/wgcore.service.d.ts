import { CreatePeerDTO, FilterDTO, UpdatePeerDTO } from './wgcore.dto';
import { PrismaService } from "../prisma/prisma.service";
export declare class WgcoreService {
    private prisma;
    constructor(prisma: PrismaService);
    _getAllPeers(): Promise<{
        id: string;
        peerName: string;
        publicKey: string;
        PresharedKey: string;
        AllowedIps: string;
        created_date: Date;
        shelflife: Date;
        banned: boolean;
    }[] | never[]>;
    _createNewPeer(peerData: CreatePeerDTO): Promise<void>;
    _getPeerByFilter(filter: FilterDTO): Promise<{
        id: string;
        peerName: string;
        publicKey: string;
        PresharedKey: string;
        AllowedIps: string;
        created_date: Date;
        shelflife: Date;
        banned: boolean;
    }[] | never[]>;
    _updatePeer(updatePeerData: UpdatePeerDTO): Promise<void>;
    _removePeer(id: any): Promise<void>;
}
