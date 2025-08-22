import {execSync} from 'child_process';
import {Injectable} from '@nestjs/common';
import {CreatePeerDTO,FilterDTO,UpdatePeerDTO,PeerDTO} from './wgcore.dto'
import {PrismaService} from "../prisma/prisma.service"
import {readFileSync,writeFileSync} from "fs"
import {CustomError} from "../error-handler/custom-error.class"



@Injectable()
export class WgcoreService {
    private wgConfHeader: string
    private wgConfPath: string
    private wgServerIp: string
    private wgServerPort: number
    private wgPublicKey: string
    private wgPrivateKey: string

    constructor(private prisma: PrismaService) {
        this.wgConfHeader = (readFileSync(process.env.WGHeaderPath || "")).toString()
        this.wgConfPath = process.env.WGConfPath || ""
        this.wgServerIp = process.env.WGServerIp || ""
        this.wgServerPort = process.env.WGServerPort || 0
        this.wgPublicKey = process.env.WGPublicKey || ""
        this.wgPrivateKey = process.env.WGPrivateKey || ""
     
//        this.getAllPeers().then(data=>console.log(data)).catch(e=>console.log(e.msg))
//        this.createPeer("test4", (new Date())).then(data=>console.log(data)).catch(e=>console.log(e.msg))
    }
    
    async _reloadWGConf() {
        execSync("service wg-quick@wg0 reload")
    }
    
    async _regenWgConf() {
        const activePeers = await this.getPeersByFilter({
            banned: false
        })
        let allPeers = this.wgConfHeader
    
        activePeers.forEach(peer=> {
            allPeers += `\n\n[Peer]\nPublicKey=${peer.PublicKey}\nPresharedKey=${peer.PresharedKey}\nAllowedIPs=${peer.AllowedIPs}`
        })
        writeFileSync(this.wgConfPath,
            allPeers)
        this._reloadWGConf()
    }
    
    async _getNewPeerId() {
        return await this.prisma.peer.findMany({
            orderBy: {
                id: "asc"
            },
            select: {
                id: true
            },
            take: -1
        }).then(data=> (data[0]?.id | 0)+2).catch(e=>throw new CustomError(500, "Ошибка VPN сервера.", e))
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
    
    async getAllPeers(): Array < PeerDTO > {
        return await this.prisma.peer.findMany().catch((e)=>throw new CustomError(500, "Ошибка VPN сервера.", e))
    }
    
    async getPeersByFilter(filter: FilterDTO) {
        return await this.prisma.peer.findMany({
            where: filter
        }).catch(e=>[])
    }
    
    async updatePeer(updatePeerData: UpdatePeerDTO) {
        await this.prisma.peer.update({
            where: {
                id: updatePeerData.id
            },
            data: updatePeerData
        }).catch(e=>throw new CustomError(404, "Пользователь для изменения не найден.", e))
    }
    
    async removePeer(id) {
        await this.prisma.peer.delete({
            where: {
                id
            }}).catch(e=>throw new CustomError(404, "Пользователь для удаления не найден."))
    }
    
    async createPeer(name,shelflife) {
        const created = (await this.getPeersByFilter({peerName:name})).length
        if (created) {
            throw new CustomError(406, "Пользователь с таким именем уже существует.", {})    
        }
        const id = await this._getNewPeerId()
        const peerKeys = await this._genPeerKeys()
        const peerData: CreatePeerDTO = {
            peerName: name,
            shelflife: shelflife,
            AllowedIPs: `10.66.66.${id}/32,fd42:42:42::${id}/128`,
            ...peerKeys
        }
        await this.prisma.peer.create({
            data: peerData
        }).catch(e=>throw new CustomError(500, "Ошибка VPN сервера.", e))
    
        await this._regenWgConf()
        return await this._genPeerConnectConfig(peerData)
    }

}


