import  { execSync } from 'child_process';
import { Injectable } from '@nestjs/common';
import {CreatePeerDTO, FilterDTO, UpdatePeerDTO, PeerDTO} from './wgcore.dto'
import {PrismaService} from "../prisma/prisma.service"
import {readFileSync, writeFileSync} from "fs"

@Injectable()
export class WgcoreService {
  private wgConfHeader:string
  private wgConfPath:string
  private wgServerIp:string
  private wgServerPort:number
  private wgPublicKey:string
  private wgPrivateKey:string
  
	constructor(private prisma:PrismaService) {
    this.wgConfHeader = (readFileSync(process.env.WGHeaderPath || "")).toString()
    this.wgConfPath = process.env.WGConfPath || ""
    this.wgServerIp = process.env.WGServerIp || ""
    this.wgServerPort= Number(process.env.WGServerPort) || 0
    this.wgPublicKey = process.env.WGPublicKey || ""
    this.wgPrivateKey = process.env.WGPrivateKey || ""

    
    this.removePeer(3)
    //this.getNewPeerId().then(data=>console.log(data))
    //this.getAllPeers().then(data=>console.log(data))
    //this.genPeerConnectConfig({peerName:"test", id:1, PrivateKey:"", PublicKey:"", PresharedKey:"", AllowedIPs:"", created_date:"", shelflife:"",banned:false}).then(data=>console.log(data))
    this.create("test2", (new Date())).then(data=>console.log(data))
	}

	async getAllPeers() {
		return await this.prisma.peer.findMany().catch(e=>[])           
	}

	async createNewPeer(peer:CreatePeerDTO) {
		await this.prisma.peer.create({data:peer}).catch(e=>e.data)
    return await this.getPeersByFilter({peerName:peer.peerName}).then(data=>data[0])
	}

  async getPeersByFilter(filter:FilterDTO) {
   return await this.prisma.peer.findMany({where:filter}).catch(e=>[])
  }	

  async updatePeer(updatePeerData:UpdatePeerDTO) {
    await this.prisma.peer.update({where:{id:updatePeerData.id}, data: updatePeerData})
  }
	
  async removePeer(id) {
    await this.prisma.peer.delete({where:{id}}).catch(e=>null)
  }

  async regenWgConf() {
    const activePeers = await this.getPeersByFilter({banned:false})
    let allPeers=this.wgConfHeader

    activePeers.forEach(peer=>{
      allPeers+=`\n\n[Peer]\nPublicKey=${peer.PublicKey}\nPresharedKey=${peer.PresharedKey}\nAllowedIPs=${peer.AllowedIPs}`
    })
    writeFileSync(this.wgConfPath, allPeers)
  }

  async genPeerKeys() {
    let commandForGenKeys = 'wg genkey | tee private.key | wg pubkey > public.key && cat private.key && cat public.key && wg genpsk && rm public.key private.key' 
    let output = execSync(commandForGenKeys).toString()
    return { 
      PrivateKey :output.split("\n")[0],
      PublicKey :output.split("\n")[1],
      PresharedKey :output.split("\n")[2]
    }
   }

   async genPeerConfig(peer:PeerDTO) {
    let peerString = "[Peer]"
    peerString += "\nPublicKey="+peer.PublicKey
    peerString += "\nPresharedKey="+peer.PresharedKey
    peerString += "\nAllowedIPs="+peer.AllowedIPs
    return peerString 
   }

   async genPeerConnectConfig(peer:PeerDTO) {
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

   async getNewPeerId() {
    return await this.prisma.peer.findMany({orderBy:{id:"asc"}, select:{id:true}, take:-1}).then(data=> (data[0]?.id | 1)+1)
   }

   async create(name, shelflife) {
    const id = await this.getNewPeerId()
    const peerKeys = await this.genPeerKeys()
    const peerData:CreatePeerDTO = {
      peerName:name,
      shelflife:shelflife,
      ...peerKeys,
      AllowedIPs:`10.66.66.${id}/32,fd42:42:42::${id}/128`
    }

    const newPeer = await this.createNewPeer(peerData)
    console.log(newPeer)

    
    const connectConfigString = await this.genPeerConnectConfig(newPeer)
    const newConfig = await this.genPeerConfig(newPeer)

    console.log(`${connectConfigString}\n\n${newConfig}`)
   }
}
 
