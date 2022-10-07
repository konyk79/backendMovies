import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SearchQueryDto, MoviesResponse } from './dtos/movies.dto';
@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  async getMovies(query: SearchQueryDto): Promise<MoviesResponse> {
    const url = `http://www.omdbapi.com/?apikey=b1688a60&type=${query.type}&s=${query.title}&y=${query.year}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    console.log(data);
    return data;
  }
}
