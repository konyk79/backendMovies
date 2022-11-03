import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SearchQueryDto, MoviesResponse } from './dtos/movies.dto';
@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  async getMovies(query: SearchQueryDto): Promise<MoviesResponse> {
    const url = `${process.env.OMD_API_GET_MOVIE_URL}/?apikey=${process.env.OMD_API_KEY}&type=${query.type}&s=${query.title}&y=${query.year}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    console.log(data);
    return data;
  }
}
