import { IsDateString, IsEnum, IsString } from 'class-validator';

export enum MovieType {
  movie = 'movie',
  series = 'series',
}
export class SearchQueryDto {
  @IsEnum(MovieType)
  type: string;
  @IsDateString()
  year: string;
  @IsString()
  title: string;
}

export interface MoviesResponse {
  Response: string;
  Error?: string;
  totalResults?: string;
  Search?: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }[];
}
