import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import mockedAnswerRedJasmin from '../mocked_answer_Red_Jasmine.json';
import mockedQuery from '../mocked_query.json';
import mockedTooManyResults from '../mocked_too_many_results.json';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  const mockAppService = {
    getMovies: jest.fn().mockImplementation(async (query) => {
      if (query.title === 'Red Jasmine') return mockedAnswerRedJasmin;
      if (query.title === 's') return mockedTooManyResults;
      return { st: 'ok' };
    }),
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: mockAppService }],
    })
      .overrideProvider(AppService)
      .useValue(mockAppService)
      .compile();
    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });
  it('appService.getMovies should be run with proper query', () => {
    appController.getMovies(mockedQuery).then((data) => {
      expect(appService.getMovies).toBeCalledWith(mockedQuery);
    });
  });
  it('should return RedJasmine result ', () => {
    appController.getMovies(mockedQuery).then((data) => {
      expect(data).toEqual(mockedAnswerRedJasmin);
    });
  });
  it('should return Too Many Results ', () => {
    appController.getMovies({ ...mockedQuery, title: 's' }).then((data) => {
      expect(data).toEqual(mockedTooManyResults);
    });
  });
});
