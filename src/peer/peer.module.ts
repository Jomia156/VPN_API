import { Module } from '@nestjs/common';
import { PeerService } from './peer.service';
import { PeerController } from './peer.controller';
import {WgcoreModule} from "../components/wgcore/wgcore.module"

@Module({
  providers: [PeerService],
  controllers: [PeerController],
  imports:[WgcoreModule]
})
export class PeerModule {}
