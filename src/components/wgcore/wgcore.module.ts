import { Module } from '@nestjs/common';
import { WgcoreService } from './wgcore.service';

@Module({
  providers: [WgcoreService]
})
export class WgcoreModule {}
