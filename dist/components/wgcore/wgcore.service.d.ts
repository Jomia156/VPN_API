import type { PeerDTO } from './wgcore.dto';
export declare class WgcoreService {
    private wgConfHeader;
    private wgConfPath;
    private wgServerIp;
    private wgServerPort;
    private wgPublicKey;
    private wgPrivateKey;
    constructor();
    _reloadWGConf(): Promise<void>;
    _regenWgConf(activePeers: Array<PeerDTO>): Promise<void>;
    _genPeerKeys(): Promise<{
        PrivateKey: string;
        PublicKey: string;
        PresharedKey: string;
    }>;
    _genPeerConfig(peer: PeerDTO): Promise<string>;
    _genPeerConnectConfig(peer: PeerDTO): Promise<string>;
    stop(): Promise<void>;
    start(): Promise<void>;
    reboot(): Promise<void>;
}
