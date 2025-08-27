import { Put,Controller, Get, Post, Body, Res, Req, Param, Query, Delete } from '@nestjs/common';
import type {Request, Response} from "express";
import {WgcoreService} from "../components/wgcore/wgcore.service"
import {PeerService} from "./peer.service"
import {CustomError} from "../components/error-handler/custom-error.class"
import {PeerID, CreatePeerDTO, FilterDTO,UpdatePeerDTO,PeerDTO} from '../components/wgcore/wgcore.dto'
import type {RequestProp} from "../publicDTO"
import {error_handler} from "../components/error-handler/errorHandler.decorator"


@Controller('peer')
export class PeerController {

  constructor(private peerService:PeerService){}
  
  @Get("/all")
  @error_handler
  async getAll(@Req() req:Request, @Res() res:Response, @Query() filter:FilterDTO):Promise<RequestProp> {
    return {
        statusCode:200,
        data:await this.peerService.getPeers(filter)
    }
  }
  
  @Delete('/:id')
  @error_handler
  async getById(@Req() req:Request, @Res() res:Response, @Param() params:PeerID):Promise<RequestProp> {
      return {
          statusCode:204,
          data:await this.peerService.removePeer(params.id)
      }
  }
  
  @Post()
  @error_handler
  async create(@Req() req:Request, @Res() res:Response, @Body() createPeerDTO:CreatePeerDTO):Promise<RequestProp> {
      return {
          statusCode:201,
          data:await this.peerService.create(createPeerDTO)
      }
  }
  
  @Put("/:id")
  @error_handler
  async update(@Req() req:Request, @Res() res:Response, @Param() params: PeerID, @Body() updatePeerDTO:UpdatePeerDTO):Promise<RequestProp> {
      return {
          statusCode:201,
          data:await this.peerService.updatePeer({...updatePeerDTO, ...params})
      }
  }
}
