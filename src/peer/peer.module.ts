import { Module } from '@nestjs/common';
import { PeerService } from './peer.service';
import { PeerController } from './peer.controller';

@Module({
  providers: [PeerService],
  controllers: [PeerController]
})
export class PeerModule {}
