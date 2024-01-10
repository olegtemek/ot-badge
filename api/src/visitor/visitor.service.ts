import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { VisitorRepository } from './visitor.repository';
import { GetVisitorDto } from './dto/get-visitor.dto';
import { OptionVisitorDto } from './dto/option-visitor.dto';

@Injectable()
export class VisitorService {
  constructor(
    private readonly visitorRepository: VisitorRepository,
    private readonly httpService: HttpService,
  ) {}

  async getVisitor(
    getVisitorDto: GetVisitorDto,
    optionVisitorDto: OptionVisitorDto,
  ) {
    try {
      const fullPath = `${getVisitorDto.username}/${getVisitorDto.repo}`;

      const repository = await this.visitorRepository.findByFullPath(fullPath);
      const visitors = repository?.visitor ? repository.visitor : 0;

      if (!repository) {
        const request = this.httpService
          .get(`https://api.github.com/repos/${fullPath}`)
          .pipe(
            catchError(() => {
              throw new BadRequestException('Something went wrong');
            }),
          );

        const { data } = await lastValueFrom(request);

        if (!data.id) {
          throw new BadRequestException('Something went wrong');
        }
      }

      const visitor = await this.visitorRepository.incrementOrCreate({
        fullPath,
        visitor: `${Number(visitors) + 1}`,
      });

      return {
        rectWidth: 60 + (visitor.visitor.length - 1) * 8,
        visitors: visitor.visitor,
        style: optionVisitorDto.style ?? 'REGULAR',
        iconColor: optionVisitorDto.iconColor ?? '#8D8D8D',
        labelColor: optionVisitorDto.labelColor ?? '#222222',
      };
    } catch (e) {
      throw e;
    }
  }
}
