import { Controller, Get, Request, Responce } from '@nestjs/common';
import {WgcoreService} from "../components/wgcore/wgcore.service"
@Controller('peer')
export class PeerController {

  constructor(private wgcoreService:WgcoreService){}

  @Get("/all")
  async getAll(req:Request, res:Responce) {
    return await this.wgcoreService.getAllPeers()
  }
}
