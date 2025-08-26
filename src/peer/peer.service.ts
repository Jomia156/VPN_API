import { Injectable } from '@nestjs/common';
import { PrismaService } from "../components/prisma/prisma.service"
import {WgcoreService} from "../components/wgcore/wgcore.service"
import {CustomError} from "../components/error-handler/custom-error.class"
import {FilterDTO,UpdatePeerDTO,PeerDTO} from '../components/wgcore/wgcore.dto'

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
    
    async getAllPeers(): Promise<Array < PeerDTO >> {
        return await this.prisma.peer.findMany().catch((e)=>{throw new CustomError(500, "Ошибка VPN сервера.", e)})
    }
    
    async getPeersByFilter(filter: FilterDTO):Promise<Array<PeerDTO>> {
        let result:Array<PeerDTO> = []
        await this.prisma.peer.findMany({
            where: filter
        }).then((data)=>{result = data }).catch((e)=>{[]})
        return result
    }
    
    async updatePeer(updatePeerData: UpdatePeerDTO):Promise<void> {
        await this.prisma.peer.update({
            where: {
                id: updatePeerData.id
            },
            data: updatePeerData
        }).catch((e)=>{throw new CustomError(404, "Пользователь для изменения не найден.", e)})
    }
    
    async removePeer(id):Promise<void> {
        await this.prisma.peer.delete({
            where: {
                id
            }}).catch((e)=>{throw new CustomError(404, "Пользователь для удаления не найден.", e)})
    }
    
    async create(name,shelflife):Promise<string> {
        const created = (await this.getPeersByFilter({peerName:name})).length
        if (created) {
            throw new CustomError(406, "Пользователь с таким именем уже существует.", {})    
        }
        const id = await this._getNewPeerId()
        const peerKeys = await this.wgcore._genPeerKeys()
        const peerData: PeerDTO = {
            peerName: name,
            shelflife: shelflife,
            AllowedIPs: `10.66.66.${id}/32,fd42:42:42::${id}/128`,
            ...peerKeys
        }
        await this.prisma.peer.create({
            data: peerData
        }).catch((e)=>{throw new CustomError(500, "Ошибка VPN сервера.", e)})
    
        await this.wgcore._regenWgConf(await this.getPeersByFilter({banned:false}))
        return await this.wgcore._genPeerConnectConfig(peerData)
    }
    
    
}

