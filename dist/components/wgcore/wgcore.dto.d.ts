export type CreatePeerDTO = {
    peerName: string;
    publicKey: string;
    PresharedKey: string;
    AllowedIps: string;
    shelflife: Date;
};
