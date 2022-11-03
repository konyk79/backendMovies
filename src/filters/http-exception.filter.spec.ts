import {
  Test,
  TestingModule
} from '@nestjs/testing';
import {
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { AxiosError } from 'axios'
import { HttpExceptionFilter } from './http-exception.filter';
import MockDate from 'mockdate';

// import { AllExceptionsFilter } from './all-exceptions.filter';
// import { AppLoggerService } from '../services/logger/app-logger.service';

// const mockAppLoggerService = {
//   info: jest.fn(),
//   error: jest.fn(),
//   warn: jest.fn(),
//   debug: jest.fn()
// };
const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus
}));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: jest.fn()
}));

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn()
};

describe('http exeption filter ', () => {
  let service: HttpExceptionFilter;
  const time = new Date(2022, 10, 2, 12, 0, 0);
  beforeEach(async () => {
      jest.clearAllMocks();
      MockDate.set(time);
      const module: TestingModule = await Test.createTestingModule({
          providers: [
            HttpExceptionFilter,

          ]
      }).compile();
      service = module.get<HttpExceptionFilter>(HttpExceptionFilter);
  });

  describe('All exception filter tests', () => {

      it('should be defined', () => {
          expect(service).toBeDefined();
      });

      it('Http exception', () => {
          service.catch(
              new HttpException('AxiosError', HttpStatus.OK),
              mockArgumentsHost
          );
          expect(mockArgumentsHost.switchToHttp).toBeCalledTimes(1);
          expect(mockArgumentsHost.switchToHttp).toBeCalledWith();
          expect(mockGetResponse).toBeCalledTimes(1);
          expect(mockGetResponse).toBeCalledWith();
          expect(mockStatus).toBeCalledTimes(1);
          expect(mockStatus).toBeCalledWith(HttpStatus.OK);
          expect(mockJson).toBeCalledTimes(1);
          expect(mockJson).toBeCalledWith({
            Error: 'AxiosError',
            Response: "False",
            statusCode: 200,
            timestamp: time.toISOString(),
          });
      });
  });
});