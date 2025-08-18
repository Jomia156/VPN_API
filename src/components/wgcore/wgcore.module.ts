import { Module } from '@nestjs/common';
import { WgcoreService } from './wgcore.service';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  providers: [WgcoreService],
  imports: [PrismaModule],
  exports: [WgcoreService]
})
export class WgcoreModule {}
