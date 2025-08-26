import { PeerService } from "./peer.service";
import type { FilterDTO, UpdatePeerDTO, PeerDTO } from '../components/wgcore/wgcore.dto';
export declare class PeerController {
    private peerService;
    constructor(peerService: PeerService);
    getAll(req: Request, res: Response): Promise<PeerDTO[]>;
    getByFilter(req: Request, res: Response, filter: FilterDTO): Promise<PeerDTO[]>;
    getById(req: Request, res: Response, params: {
        id: string;
    }): Promise<void>;
    create(createPeerDTO: {
        peerName: string;
        shelflife: string;
    }, req: Request, res: Response): Promise<string>;
    update(updatePeerDTO: UpdatePeerDTO, req: Request, res: Response): Promise<void>;
}
