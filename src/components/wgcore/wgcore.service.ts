import {execSync} from 'child_process';
import {Injectable} from '@nestjs/common';
import type {FilterDTO,UpdatePeerDTO,PeerDTO} from './wgcore.dto'
import {PrismaService} from "../prisma/prisma.service"
import {readFileSync,writeFileSync} from "fs"
import {CustomError} from "../error-handler/custom-error.class"



@Injectable()
export class WgcoreService {
    private wgConfHeader: string
    private wgConfPath: string
    private wgServerIp: string
    private wgServerPort: string
    private wgPublicKey: string
    private wgPrivateKey: string

    constructor() {
        this.wgConfHeader = (readFileSync(process.env.WGHeaderPath || "")).toString()
        this.wgConfPath = process.env.WGConfPath || ""
        this.wgServerIp = process.env.WGServerIp || ""
        this.wgServerPort = process.env.WGServerPort || ""
        this.wgPublicKey = process.env.WGPublicKey || ""
        this.wgPrivateKey = process.env.WGPrivateKey || ""
    }
    
    async _reloadWGConf():Promise<void> {
        execSync("service wg-quick@wg0 reload")
    }
    
    async _regenWgConf(activePeers:Array<PeerDTO>) {
        let config = this.wgConfHeader
    
        activePeers.forEach(peer=> {
            config += `\n\n[Peer]\nPublicKey=${peer.PublicKey}\nPresharedKey=${peer.PresharedKey}\nAllowedIPs=${peer.AllowedIPs}`
        })
        writeFileSync(this.wgConfPath, config)
        this._reloadWGConf()
    }
    
    
    
    async _genPeerKeys() {
        let commandForGenKeys = 'wg genkey | tee private.key | wg pubkey > public.key && cat private.key && cat public.key && wg genpsk && rm public.key private.key'
        let output = execSync(commandForGenKeys).toString()
            return {
            PrivateKey: output.split("\n")[0],
            PublicKey: output.split("\n")[1],
            PresharedKey: output.split("\n")[2]
        }
    }
    
    async _genPeerConfig(peer: PeerDTO) {
        let peerString = "[Peer]"
        peerString += "\nPublicKey="+peer.PublicKey
        peerString += "\nPresharedKey="+peer.PresharedKey
        peerString += "\nAllowedIPs="+peer.AllowedIPs
        return peerString
    }
    
    async _genPeerConnectConfig(peer: PeerDTO) {
        let clientConfigString = "[Interface]"
        clientConfigString += "\nPrivateKey="+peer.PrivateKey
        clientConfigString += "\nAddress="+peer.AllowedIPs
        clientConfigString += "\nDNS=1.1.1.1,8.8.8.8"
        clientConfigString += "\n\n[Peer]"
        clientConfigString += "\nPublicKey="+this.wgPublicKey
        clientConfigString += "\nPresharedKey="+peer.PresharedKey
        clientConfigString += "\nEndpoint="+this.wgServerIp+":"+this.wgServerPort
        clientConfigString += "\nAllowedIPs=0.0.0.0/0,::/0"
        return clientConfigString
    }

}

