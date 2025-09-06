import type { Request, Response } from "express";
import { PeerService } from "./peer.service";
import { PeerID, CreatePeerDTO, FilterDTO, UpdatePeerDTO } from '../components/wgcore/wgcore.dto';
import type { RequestProp } from "../publicDTO";
export declare class PeerController {
    private peerService;
    constructor(peerService: PeerService);
    getAll(req: Request, res: Response, filter: FilterDTO): Promise<RequestProp>;
    getById(req: Request, res: Response, params: PeerID): Promise<RequestProp>;
    create(req: Request, res: Response, createPeerDTO: CreatePeerDTO): Promise<RequestProp>;
    update(req: Request, res: Response, params: PeerID, updatePeerDTO: UpdatePeerDTO): Promise<RequestProp>;
}
