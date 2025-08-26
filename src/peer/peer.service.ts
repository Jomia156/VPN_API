import { Injectable } from '@nestjs/common';
import { PrismaService } from "../components/prisma/prisma.service"
import {WgcoreService} from "../components/wgcore/wgcore.service"
import {CustomError} from "../components/error-handler/custom-error.class"



type CreatePeerDTO = {
    peerName:string,
    shelflife:Date
}

type PeerDTO = {
  id:number,
  peerName:string,
  PrivateKey:string,
  PublicKey:string,
  PresharedKey:string,
  AllowedIPs:string,
  created_date:Date,
  shelflife:Date,
  banned:boolean 
}

@Injectable()
export class PeerService {
    
    constructor (
        private prisma:PrismaService,
        private wgcore:WgcoreService
        ) {
            this.create("sdsfs", new Date().toISOString()).then(data=>console.log(data)).catch(e=>console.log(e))
        }
    
    private async _getNewPeerId() {
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
    
    async create(name,shelflife) {
        const created = (await this.getPeersByFilter({peerName:name})).length
        if (created) {
            throw new CustomError(406, "Пользователь с таким именем уже существует.", {})    
        }
        const id = await this._getNewPeerId()
        const peerKeys = await this.wgcore._genPeerKeys()
        const peerData: CreatePeerDTO = {
            peerName: name,
            shelflife: shelflife,
            AllowedIPs: `10.66.66.${id}/32,fd42:42:42::${id}/128`,
            ...peerKeys
        }
        await this.prisma.peer.create({
            data: peerData
        }).catch(e=>throw new CustomError(500, "Ошибка VPN сервера.", e))
    
        await this.wgcore._regenWgConf(await this.getPeersByFilter({banned:false}))
        return await this.wgcore._genPeerConnectConfig(peerData)
    }
    
    
}

