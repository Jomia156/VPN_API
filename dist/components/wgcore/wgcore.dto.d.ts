export type CreatePeerDTO = {
    peerName: string;
    PublicKey: string;
    PresharedKey: string;
    AllowedIPs: string;
    shelflife: string;
};
export type FilterDTO = {
    AllowedIps?: string;
    peerName?: string;
    banned?: boolean;
};
export type UpdatePeerDTO = {
    id: string;
    peerName?: string;
    banned?: boolean;
    shelflife?: string;
};
