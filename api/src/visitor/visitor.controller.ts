import { Controller, Get, Param, Query, Render, Res } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { GetVisitorDto } from './dto/get-visitor.dto';
import { OptionVisitorDto } from './dto/option-visitor.dto';
import { Response } from 'express';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Get(':username/:repo')
  @Render('visitor')
  getVisit(
    @Param() getVisitorDto: GetVisitorDto,
    @Query() optionVisitorDto: OptionVisitorDto,
    @Res() res: Response,
  ) {
    res.setHeader('Content-Type', 'image/svg+xml;charset=utf-8');
    res.header(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
    );
    return this.visitorService.getVisitor(getVisitorDto, optionVisitorDto);
  }
}
