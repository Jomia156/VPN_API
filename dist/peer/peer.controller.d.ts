import type { Request, Response } from "express";
import { PeerService } from "./peer.service";
import { CreatePeerDTO, FilterDTO, UpdatePeerDTO } from '../components/wgcore/wgcore.dto';
export declare class PeerController {
    private peerService;
    constructor(peerService: PeerService);
    getAll(req: Request, res: Response): Promise<void>;
    getByFilter(req: Request, res: Response, filter: FilterDTO): Promise<void>;
    getById(req: Request, res: Response, params: {
        id: string;
    }): Promise<void>;
    create(createPeerDTO: CreatePeerDTO, req: Request, res: Response): Promise<void>;
    update(updatePeerDTO: UpdatePeerDTO, req: Request, res: Response): Promise<void>;
}
