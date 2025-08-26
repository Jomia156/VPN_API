import { PrismaService } from "../components/prisma/prisma.service";
import { WgcoreService } from "../components/wgcore/wgcore.service";
import { FilterDTO, UpdatePeerDTO, PeerDTO } from '../components/wgcore/wgcore.dto';
export declare class PeerService {
    private prisma;
    private wgcore;
    constructor(prisma: PrismaService, wgcore: WgcoreService);
    private _getNewPeerId;
    getAllPeers(): Promise<Array<PeerDTO>>;
    getPeersByFilter(filter: FilterDTO): Promise<Array<PeerDTO>>;
    updatePeer(updatePeerData: UpdatePeerDTO): Promise<void>;
    removePeer(id: any): Promise<void>;
    create(name: any, shelflife: any): Promise<string>;
}
