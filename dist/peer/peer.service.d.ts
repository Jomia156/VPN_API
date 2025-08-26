import { PrismaService } from "../components/prisma/prisma.service";
import { WgcoreService } from "../components/wgcore/wgcore.service";
type PeerDTO = {
    id: number;
    peerName: string;
    PrivateKey: string;
    PublicKey: string;
    PresharedKey: string;
    AllowedIPs: string;
    created_date: Date;
    shelflife: Date;
    banned: boolean;
};
export declare class PeerService {
    private prisma;
    private wgcore;
    constructor(prisma: PrismaService, wgcore: WgcoreService);
    private _getNewPeerId;
    getAllPeers(): Array<PeerDTO>;
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
export {};
