import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SearchQueryDto } from './dtos/movies.dto';
@Controller('/movies')
@UsePipes(new ValidationPipe({ transform: true })) //Validation by DTO
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getMovies(@Query() query: SearchQueryDto): Promise<any> {
    return this.appService.getMovies(query);
  }
}