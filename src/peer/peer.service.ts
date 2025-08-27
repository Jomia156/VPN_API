import { Injectable } from '@nestjs/common';
import { PrismaService } from "../components/prisma/prisma.service"
import {WgcoreService} from "../components/wgcore/wgcore.service"
import {CustomError} from "../components/error-handler/custom-error.class"
import {FilterDTO,UpdatePeerDTO,PeerDTO, CreatePeerDTO} from '../components/wgcore/wgcore.dto'

@Injectable()
export class PeerService {
    
    constructor (
        private prisma:PrismaService,
        private wgcore:WgcoreService
        ) {}
    
    private async _getNewPeerId():Promise<number> {
        return await this.prisma.peer.findMany({
            orderBy: {
                id: "asc"
            },
            select: {
                id: true
            },
            take: -1
        }).then(data=> (data[0]?.id | 0)+2).catch((e)=>{throw new CustomError(500, "Ошибка VPN сервера.", e)})
    }
    
    async getPeers(filter:FilterDTO): Promise<Array < PeerDTO >> {
        return await this.prisma.peer.findMany({where:filter}).catch((e)=>{throw new CustomError(500, "Ошибка VPN сервера.", e)})
    }
    
    
    async updatePeer(updatePeerData: UpdatePeerDTO):Promise<void> {
        await this.prisma.peer.update({
            where: {
                id: updatePeerData.id
            },
            data: updatePeerData
        }).catch((e)=>{throw new CustomError(404, "Пользователь для изменения не найден.", e)})
        this.wgcore._regenWgConf(await this.getPeers({banned:false}))
    }
    
    async removePeer(id):Promise<void> {
        await this.prisma.peer.delete({
            where: {
                id
            }}).catch((e)=>{throw new CustomError(404, "Пользователь для удаления не найден.", e)})
        this.wgcore._regenWgConf(await this.getPeers({banned:false}))
    }
    
    async create(createPeerDTO:CreatePeerDTO):Promise<string> {
        const created = (await this.getPeers({peerName:createPeerDTO.peerName})).length
        if (created) {
            throw new CustomError(406, "Пользователь с таким именем уже существует.", {})    
        }
        const id = await this._getNewPeerId()
        const peerKeys = await this.wgcore._genPeerKeys()
        const peerData: PeerDTO = {
            peerName: createPeerDTO.peerName,
            shelflife: createPeerDTO.shelflife,
            AllowedIPs: `10.66.66.${id}/32,fd42:42:42::${id}/128`,
            ...peerKeys
        }
        await this.prisma.peer.create({
            data: peerData
        }).catch((e)=>{throw new CustomError(500, "Ошибка VPN сервера.", e)})
    
        this.wgcore._regenWgConf(await this.getPeers({banned:false}))
        return await this.wgcore._genPeerConnectConfig(peerData)
    }
}
