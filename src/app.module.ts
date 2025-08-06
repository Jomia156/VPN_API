import { Module } from '@nestjs/common';
import { PeerModule } from './peer/peer.module';
import { WgcoreModule } from './components/wgcore/wgcore.module';

@Module({
  imports: [PeerModule, WgcoreModule],
})
export class AppModule {}
