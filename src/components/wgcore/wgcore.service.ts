import { Injectable } from '@nestjs/common';
import {CreatePeerDTO, FilterDTO, UpdatePeerDTO} from './wgcore.dto'
import {PrismaService} from "../prisma/prisma.service"
import {readFileSync, writeFileSync} from "fs"

@Injectable()
export class WgcoreService {
  private wgConfHeader:string
  private wgConfPath:string
	constructor(private prisma:PrismaService) {
    this.wgConfHeader = (readFileSync(process.env.WGHeaderPath || "")).toString()
    this.wgConfPath = process.env.WGConfPath || ""


		const date = new Date().toISOString()

		this._createNewPeer({
			peerName:"test2",
			PublicKey:"randKey1",
			PresharedKey:"randKey2",
			AllowedIPs:"1.1.1.3", 
			shelflife:date
		})
		//this._getAllPeers().then((data)=>console.log(data))
		this._getPeersByFilter({peerName:"test"}).then(data=>console.log(data))
    //this._updatePeer({id:"test", banned:true}) 
    this._removePeer("test") 
    this.regenWgConf()
	}

	async _getAllPeers() {
		return await this.prisma.peer.findMany().catch(e=>[])           
	}

	async _createNewPeer(peerData:CreatePeerDTO) {
		await this.prisma.peer.create({data:peerData}).catch(e=>e.data)
	}

  async _getPeersByFilter(filter:FilterDTO) {
   return await this.prisma.peer.findMany({where:filter}).catch(e=>[])
  }	

  async _updatePeer(updatePeerData:UpdatePeerDTO) {
    await this.prisma.peer.update({where:{peerName:updatePeerData.id}, data: updatePeerData})
  }
	
  async _removePeer(id) {
    await this.prisma.peer.delete({where:{peerName:id}}).catch(e=>null)
  }

  async regenWgConf() {
    const activePeers = await this._getPeersByFilter({banned:false})
    let allPeers=this.wgConfHeader

    activePeers.forEach(peer=>{
      allPeers+=`\n\n[Peer]\nPublicKey=${peer.PublicKey}\nPresharedKey=${peer.PresharedKey}\nAllowedIPs=${peer.AllowedIPs}`
    })
    writeFileSync(this.wgConfPath, allPeers)
  }
}
 
