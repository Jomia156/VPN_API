import { Controller, Get, Post, Body, Res, Req, Param, Request, Response, Query, Delete } from '@nestjs/common';
import {WgcoreService} from "../components/wgcore/wgcore.service"
import {PeerService} from "./peer.service"
import {CustomError} from "../components/error-handler/custom-error.class"
import type {FilterDTO,UpdatePeerDTO,PeerDTO} from '../components/wgcore/wgcore.dto'


@Controller('peer')
export class PeerController {

  constructor(private peerService:PeerService){}

  
  @Get("/all")
  async getAll(@Req() req:Request, @Res() res:Response) {
    return await this.peerService.getAllPeers()
  }
  
  @Get('/filter')
  async getByFilter(@Req() req:Request, @Res() res:Response, @Query() filter:FilterDTO) {
      return await this.peerService.getPeersByFilter({...filter})
  }
  
  @Delete('/:id')
  async getById(@Req() req:Request, @Res() res:Response, @Param() params:{id:string}) {
      return await this.peerService.removePeer(params.id)
  }
  
  @Post()
  async create(@Body() createPeerDTO:{peerName:string, shelflife:string}, @Req() req:Request, @Res() res:Response) {
      return await this.peerService.create(createPeerDTO.peerName, createPeerDTO.shelflife)
  }
  
  @Post("update")
  async update(@Body() updatePeerDTO:UpdatePeerDTO, @Req() req:Request, @Res() res:Response) {
      return await this.peerService.updatePeer(updatePeerDTO)
  }
}
 
