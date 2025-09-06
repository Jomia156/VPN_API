import { Controller, Get, Req,Res } from '@nestjs/common';
import type {Request, Response} from "express";
import {ServerService} from "./server.service"
import {error_handler} from "../components/error-handler/errorHandler.decorator"
import {WgcoreService} from "../components/wgcore/wgcore.service"
import type {RequestProp} from "../publicDTO"

@Controller('server')
export class ServerController {
    
    constructor(private serverService:ServerService, private wgcoreService:WgcoreService){}
    
    @Get("reboot")
    @error_handler
    async rebootServer(@Req() req:Request, @Res() res:Response):Promise<RequestProp> {
        this.serverService.reboot()
        return {
            statusCode:200
        }
    }
    
    @Get("wg/stop")
    @error_handler
    async stopWgService(@Req() req:Request, @Res() res:Response):Promise<RequestProp> {
        this.wgcoreService.stop()
        return {
            statusCode:200
        }
    }
    
    @Get("wg/start")
    @error_handler
    async startWGService(@Req() req:Request, @Res() res:Response):Promise<RequestProp> {
        this.wgcoreService.start()
        return {
            statusCode:200
        }
    }
    
    @Get("wg/reboot")
    @error_handler
    async rebotWGService(@Req() req:Request, @Res() res:Response):Promise<RequestProp> {
        this.wgcoreService.reboot()
        return {
            statusCode:200
        }
    }
}
