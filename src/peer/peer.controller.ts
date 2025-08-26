import { Controller, Get, Request, Responce } from '@nestjs/common';
import {WgcoreService} from "../components/wgcore/wgcore.service"
import {PeerService} from "./peer.service"
import {CustomError} from "../components/error-handler/custom-error.class"

function errorHandler() {
  
  return function (target ,name, descriptor)  {
    

    let origin = descriptor.value
    descriptor.value = async function()  {
        //return await origin.apply(this, arguments).then((data)=>{{data}}).catch((e)=> {{status:e.status, description:e.msg}})
        
        try {
            const result = await origin.apply(this, arguments)
            return {data:result}
        }
        catch(e) {
            if (e instanceof CustomError) {
                console.log(target.constructor.name,name, "->>>", e.msg)
                return {
                    status:e.status,
                    description:e.msg 
                }
            }
            console.log(target.constructor.name,name, "->>>", e)
            return {
                status:500,
                description:"Ошибка VPN сервера."
            }
        }
        
        
    }
    return descriptor   
    
  }
}

@Controller('peer')
export class PeerController {

  constructor(private peerService:PeerService){}

  
  @Get("/all")
  @errorHandler()
  async getAll(this:this, req:Request, res:Responce) {
    return await this.peerService.getAllPeers()
  }
}
