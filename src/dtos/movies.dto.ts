/* eslint-disable prettier/prettier */
import { IsDateString, IsEnum, IsString } from 'class-validator';

export enum MovieType {
  movie = 'movie',
  series = 'series'
}
export class SearchQueryDto {
  @IsEnum(MovieType)
  type: string;
  @IsDateString()
  year: string;
  @IsString()
  title: string;
}
