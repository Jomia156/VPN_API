import { Put,Controller, Get, Post, Body, Res, Req, Param, Query, Delete } from '@nestjs/common';
import type {Request, Response} from "express";
import {WgcoreService} from "../components/wgcore/wgcore.service"
import {PeerService} from "./peer.service"
import {CustomError} from "../components/error-handler/custom-error.class"
import {PeerID, CreatePeerDTO, FilterDTO,UpdatePeerDTO,PeerDTO} from '../components/wgcore/wgcore.dto'

@Controller('peer')
export class PeerController {

  constructor(private peerService:PeerService){}
  
  @Get("/all")
  async getAll(@Query() filter:FilterDTO, @Req() req:Request, @Res() res:Response) {
    const result = {
        status:200,
        data:await this.peerService.getPeers(filter)
    }
    res.status(result.status).json(result)
  }
  
  @Delete('/:id')
  async getById(@Req() req:Request, @Res() res:Response, @Param() params:PeerID) {
      const result = {
          status:204,
          data:await this.peerService.removePeer(params.id)
      }
      res.status(result.status).json(result)
  }
  
  @Post()
  async create(@Body() createPeerDTO:CreatePeerDTO, @Req() req:Request, @Res() res:Response) {
      const result = {
          status:201,
          data:await this.peerService.create(createPeerDTO)
      }
      res.status(result.status).json(result)
  }
  
  @Put("/:id")
  async update(@Query() params: PeerID, @Body() updatePeerDTO:UpdatePeerDTO, @Req() req:Request, @Res() res:Response) {
      const result = {
          status:204,
          data:await this.peerService.updatePeer({...updatePeerDTO, ...params})
      }
      res.status(result.status).json(result)
  }
}
