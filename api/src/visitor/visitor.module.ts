import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';
import { HttpModule } from '@nestjs/axios';
import { VisitorRepository } from './visitor.repository';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  controllers: [VisitorController],
  providers: [VisitorService, VisitorRepository],
})
export class VisitorModule {}
