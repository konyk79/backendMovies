import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import mockedAnswerRedJasmin from '../mocked_answer_Red_Jasmine.json';
import mockedQuery from '../mocked_query.json';
import mockedTooManyResults from '../mocked_too_many_results.json';
import { Observable, of } from 'rxjs';
import { AxiosResponse } from 'axios';
import MockDate from 'mockdate';

describe('App Service tests', () => {
  let module: TestingModule;
  let service: AppService;
  const time = new Date(2022, 10, 2, 12, 0, 0);
  const mocHttpService = {
    get: jest.fn((query: string): Observable<AxiosResponse<any, any>> => {
      if (
        query ===
        'http://www.omdbapi.com/?apikey=b1688a60&type=movie&s=R&y=2022'
      ) {
        return of({ data: mockedTooManyResults } as AxiosResponse<any, any>);
      }
      if (
        query ===
        'http://www.omdbapi.com/?apikey=b1688a60&type=movie&s=Red Jasmine&y=2022'
      ) {
        return of({ data: mockedAnswerRedJasmin } as AxiosResponse<any, any>);
      }
      return of({
        data: {
          Response: 'False',
          statusCode: 200,
          timestamp: time.toISOString,
          Error: 'getaddrinfo ENOTFOUND www.omdbapi44.com',
        },
      } as AxiosResponse<any, any>);
    }),
  };
  beforeEach(async () => {
    jest.clearAllMocks();
    MockDate.set(time);
    module = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: HttpService,
          useValue: mocHttpService,
        },
      ],
    }).compile();
    service = module.get<AppService>(AppService);
  });
  it('service should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('testing getMovies function...', () => {
    it('httpService.get() should be invoked with queries', (done) => {
      service.getMovies(mockedQuery).then((data) => {
        expect(mocHttpService.get).toBeCalledWith(
          'http://www.omdbapi.com/?apikey=b1688a60&type=movie&s=Red Jasmine&y=2022',
        );
        done();
      });
    });
    it('should return proper data', async () => {
      await service.getMovies(mockedQuery).then((data) => {
        expect(data).toEqual(mockedAnswerRedJasmin);
      });
    });
    it('should return Error = Too many results ', async () => {
      await service.getMovies({ ...mockedQuery, title: 'R' }).then((data) => {
        expect(data).toEqual(mockedTooManyResults);
      });
    });
    it('bad url should return ENOTFOUND', async () => {
      process.env.OMD_API_GET_MOVIE_URL = 'http://www.omdbapi23.com';
      await service.getMovies(mockedQuery).then((data) => {
        expect(data).toEqual({
          Response: 'False',
          statusCode: 200,
          timestamp: time.toISOString,
          Error: 'getaddrinfo ENOTFOUND www.omdbapi44.com',
        });
      });
    });
  });
});
