import { Injectable } from '@nestjs/common';
import {CreatePeerDTO, FilterDTO, UpdatePeerDTO} from './wgcore.dto'
import {PrismaService} from "../prisma/prisma.service"

@Injectable()
export class WgcoreService {
       
	constructor(private prisma:PrismaService) {
		const date = new Date().toISOString()

		this._createNewPeer({
		  id:"test2",
			peerName:"test2",
			publicKey:"randKey1",
			PresharedKey:"randKey2",
			AllowedIps:"1.1.1.3", 
			shelflife:date
		})
		//this._getAllPeers().then((data)=>console.log(data))
		this._getPeerByFilter({peerName:"test"}).then(data=>console.log(data))
    //this._updatePeer({id:"test", banned:true}) 
    this._removePeer("test") 
	}

	async _getAllPeers() {
		return await this.prisma.peer.findMany().catch(e=>[])           
	}

	async _createNewPeer(peerData:CreatePeerDTO) {
		await this.prisma.peer.create({data:peerData}).catch(e=>e.data)
	}

  async _getPeerByFilter(filter:FilterDTO) {
   return await this.prisma.peer.findMany({where:filter}).catch(e=>[])
  }	

  async _updatePeer(updatePeerData:UpdatePeerDTO) {
    await this.prisma.peer.update({where:{peerName:updatePeerData.id}, data: updatePeerData})
  }
	
  async _removePeer(id) {
    await this.prisma.peer.delete({where:{id}}).catch(e=>null)
  }
}
 
