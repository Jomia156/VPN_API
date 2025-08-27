export declare class PeerDTO {
    id?: number;
    peerName: string;
    PrivateKey: string;
    PublicKey: string;
    PresharedKey: string;
    AllowedIPs: string;
    created_date?: Date;
    shelflife: Date;
    banned?: boolean;
}
export declare class CreatePeerDTO {
    peerName: string;
    shelflife: Date;
}
export declare class FilterDTO {
    AllowedIps?: string;
    peerName?: string;
    banned?: boolean;
}
export declare class UpdatePeerDTO {
    id: number;
    peerName?: string;
    banned?: boolean;
    shelflife?: Date;
}
