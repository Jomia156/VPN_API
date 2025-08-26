import { Module } from '@nestjs/common';
import { PeerService } from './peer.service';
import { PeerController } from './peer.controller';
import {WgcoreModule} from "../components/wgcore/wgcore.module"
import {PrismaModule} from "../components/prisma/prisma.module"

@Module({
  providers: [PeerService],
  controllers: [PeerController],
  imports:[PrismaModule, WgcoreModule]
})
export class PeerModule {}
