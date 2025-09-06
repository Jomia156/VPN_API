import type { Request, Response } from "express";
import { ServerService } from "./server.service";
import { WgcoreService } from "../components/wgcore/wgcore.service";
import type { RequestProp } from "../publicDTO";
export declare class ServerController {
    private serverService;
    private wgcoreService;
    constructor(serverService: ServerService, wgcoreService: WgcoreService);
    rebootServer(req: Request, res: Response): Promise<RequestProp>;
    stopWgService(req: Request, res: Response): Promise<RequestProp>;
    startWGService(req: Request, res: Response): Promise<RequestProp>;
    rebotWGService(req: Request, res: Response): Promise<RequestProp>;
}
