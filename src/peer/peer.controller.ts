import { Controller, Get, Post, Body, Res, Req, Param, Query, Delete } from '@nestjs/common';
import type {Request, Response} from "express";
import {WgcoreService} from "../components/wgcore/wgcore.service"
import {PeerService} from "./peer.service"
import {CustomError} from "../components/error-handler/custom-error.class"
import {CreatePeerDTO, FilterDTO,UpdatePeerDTO,PeerDTO} from '../components/wgcore/wgcore.dto'




@Controller('peer')
export class PeerController {

  constructor(private peerService:PeerService){}

  
  @Get("/all")
  async getAll(@Req() req:Request, @Res() res:Response) {
    const result = {
        status:200,
        data:await this.peerService.getAllPeers()
    }
    res.status(result.status).json(result)
  }
  
  @Get('/filter')
  async getByFilter(@Req() req:Request, @Res() res:Response, @Query() filter:FilterDTO) {
      console.log(filter)
      const result = {
          status:200,
          data:await this.peerService.getPeersByFilter({...filter})
      }
      res.status(result.status).json(result)
  }
  
  @Delete('/:id')
  async getById(@Req() req:Request, @Res() res:Response, @Param() params:{id:string}) {
      const result = {
          status:204,
          data:await this.peerService.removePeer(params.id)
      }
      res.status(result.status).json(result)
  }
  
  @Post()
  async create(@Body() createPeerDTO:CreatePeerDTO, @Req() req:Request, @Res() res:Response) {
      console.log(createPeerDTO)
      const result = {
          status:204,
          data:await this.peerService.create(createPeerDTO.peerName, createPeerDTO.shelflife)
      }
      res.status(result.status).json(result)
  }
  
  @Post("update")
  async update(@Body() updatePeerDTO:UpdatePeerDTO, @Req() req:Request, @Res() res:Response) {
      const result = {
          status:204,
          data:await this.peerService.updatePeer(updatePeerDTO)
      }
      res.status(result.status).json(result)
  }
}
