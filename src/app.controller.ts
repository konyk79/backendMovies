import {
  Controller,
  Get,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MoviesResponse, SearchQueryDto } from './dtos/movies.dto';
import { HttpExceptionFilter } from './filters/http-exception.filter';
@Controller('/movies')
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @UsePipes(new ValidationPipe({ transform: true })) //Validation by DTO
  @UseFilters(HttpExceptionFilter)
  @Get()
  getMovies(@Query() query: SearchQueryDto): Promise<MoviesResponse> {
    return this.appService.getMovies(query);
  }

}
