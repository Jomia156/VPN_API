import { Module } from '@nestjs/common';
import {PrismaModule} from "./components/prisma/prisma.module"
import {LoggerModule} from "./components/logger/logger.module"
import { PeerModule } from './peer/peer.module';
import { WgcoreModule } from './components/wgcore/wgcore.module';
import {ConfigModule} from "@nestjs/config"
import { ServerModule } from './server/server.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),PeerModule, WgcoreModule, LoggerModule, PrismaModule, ServerModule, AuthModule],
  providers: []
  })
export class AppModule {}
