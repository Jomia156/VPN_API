import { Responce } from '@nestjs/common';
import { WgcoreService } from "../components/wgcore/wgcore.service";
export declare class PeerController {
    private wgcoreService;
    constructor(wgcoreService: WgcoreService);
    getAll(this: this, req: Request, res: Responce): Promise<import("../components/wgcore/wgcore.dto").PeerDTO[]>;
}
