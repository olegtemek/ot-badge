import { Module } from '@nestjs/common';
import { VisitorModule } from './visitor/visitor.module';
import { PrismaModule } from '@prisma/prisma';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VisitorModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
