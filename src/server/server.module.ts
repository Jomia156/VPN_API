import { Module } from '@nestjs/common';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import {WgcoreModule} from '../components/wgcore/wgcore.module'


@Module({
  controllers: [ServerController],
  providers: [ServerService],
  imports: [WgcoreModule]
})
export class ServerModule {}
