import { Controller, Get, Request, Responce } from '@nestjs/common';
import {WgcoreService} from "../components/wgcore/wgcore.service"


function testDec() {
  
  return function (target ,name, descriptor)  {
    console.log(target.constructor.name,name)

    let origin = descriptor.value
    descriptor.value = async function()  {
        let result = await origin.apply(this, arguments)
        console.log(result)
        return result
    }
    return descriptor
    
  }
}

@Controller('peer')
export class PeerController {

  constructor(private wgcoreService:WgcoreService){}

  
  @Get("/all")
  @testDec(this)
  async getAll(this:this, req:Request, res:Responce) {
    return await this.wgcoreService.getAllPeers()
  }
}
