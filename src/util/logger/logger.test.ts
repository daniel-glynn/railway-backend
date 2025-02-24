import { logger } from './index';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const mockDate = (date: Date): void => {
  class MockedDate extends Date {
    constructor() {
      super(date);
    }
  }
  (global as { Date: any }).Date = MockedDate;
  Date.now = jest.fn().mockImplementation(() => 999);
};


describe('logger', () => {
  let timestamp: Date;
  const pinoLogger = logger;
  beforeEach(() => {
    jest.resetAllMocks();
    timestamp = new Date('22-02-2025');
    mockDate(timestamp);
  });

  describe('pino logger', () => {
    it('logs info using msg', () => {
      const msg = 'This is a log message';
      const handler = jest.spyOn(logger, 'info');
      pinoLogger.info(msg);
      expect(handler).toHaveBeenCalledWith(msg);
    });

    it('logs info using msg and an optional obj', () => {
      const msg = 'This is a log message';
      const obj = { someProp: 'Some string' };
      const handler = jest.spyOn(logger, 'info');
      pinoLogger.info(msg, obj);
      expect(handler).toHaveBeenCalledWith(msg, obj);
    });

    it('logs error', () => {
      const message = { someProp: 'Some error' };
      const handler = jest.spyOn(logger, 'error');
      pinoLogger.error(message);
      expect(handler).toHaveBeenCalledWith(message);
    });

    it('logs warning', () => {
      const message = { someProp: 'Some string' };
      const handler = jest.spyOn(logger, 'warn');
      pinoLogger.warn(message);
      expect(handler).toHaveBeenCalledWith(message);
    });

    it('logs debug', () => {
      const message = { someProp: 'Some string' };
      const handler = jest.spyOn(logger, 'debug');
      pinoLogger.debug(message);
      expect(handler).toHaveBeenCalledWith(message);
    });
    it('does not log to wrong channel', () => {
      const message = { someProp: 'Some string' };
      const handler = jest.spyOn(logger, 'warn');
      pinoLogger.debug(message);
      expect(handler).not.toHaveBeenCalledWith(message);
    });
  });
});