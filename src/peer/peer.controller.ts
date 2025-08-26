import { Controller, Get, Request, Response } from '@nestjs/common';
import {WgcoreService} from "../components/wgcore/wgcore.service"
import {PeerService} from "./peer.service"
import {CustomError} from "../components/error-handler/custom-error.class"

@Controller('peer')
export class PeerController {

  constructor(private peerService:PeerService){}

  
  @Get("/all")
  async getAll(this:this, req:Request, res:Response) {
    return await this.peerService.getAllPeers()
  }
}
