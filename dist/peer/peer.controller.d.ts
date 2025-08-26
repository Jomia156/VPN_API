import { Responce } from '@nestjs/common';
import { PeerService } from "./peer.service";
export declare class PeerController {
    private peerService;
    constructor(peerService: PeerService);
    getAll(this: this, req: Request, res: Responce): Promise<{
        id: number;
        peerName: string;
        PrivateKey: string;
        PublicKey: string;
        PresharedKey: string;
        AllowedIPs: string;
        created_date: Date;
        shelflife: Date;
        banned: boolean;
    }[]>;
}
