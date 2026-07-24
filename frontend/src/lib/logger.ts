import pino from 'pino';

const isDev = process.env.NODE_ENV !== 'production';

export const logger = pino({
  level: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  base: {
    env: process.env.NODE_ENV,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  ...(isDev && typeof window === 'undefined' && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  }),
});

/**
 * Standardized logging utility matching Enterprise PRD guidelines
 * Payloads structure: { timestamp, level, context, message }
 */
export const log = {
  info: (context: string, message: string, data?: any) => {
    logger.info({ context, ...data }, message);
  },
  error: (context: string, message: string, error?: any) => {
    logger.error({ context, err: error }, message);
  },
  warn: (context: string, message: string, data?: any) => {
    logger.warn({ context, ...data }, message);
  },
  debug: (context: string, message: string, data?: any) => {
    logger.debug({ context, ...data }, message);
  }
};
