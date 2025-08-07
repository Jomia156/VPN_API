import { Module } from '@nestjs/common';
import {PrismaModule} from "./components/prisma/prisma.module"
import {LoggerModule} from "./components/logger/logger.module"
import { PeerModule } from './peer/peer.module';
import { WgcoreModule } from './components/wgcore/wgcore.module';

@Module({
  imports: [PeerModule, WgcoreModule, LoggerModule, PrismaModule],
})
export class AppModule {}
