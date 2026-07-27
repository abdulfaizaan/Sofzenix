import { NextResponse } from "next/server";
import { z } from "zod";
import { ApiError, ValidationError } from "./api-error";
import pino from "pino";

// A simple pino logger instance for the wrapper
const logger = pino({ name: "api-error-handler" });

type Handler = (request: Request, context: any) => Promise<NextResponse> | NextResponse;

export function withErrorHandler(handler: Handler) {
  return async (request: Request, context: any) => {
    try {
      return await handler(request, context);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const validationError = new ValidationError(error.issues);
        return NextResponse.json(
          { error: { code: validationError.code, message: validationError.message, details: validationError.details } },
          { status: validationError.statusCode }
        );
      }

      if (error instanceof ApiError) {
        if (error.statusCode >= 500) {
          logger.error({ err: error, path: request.url }, "API Error");
        }
        return NextResponse.json(
          { error: { code: error.code, message: error.message, details: error.details } },
          { status: error.statusCode }
        );
      }

      // Unhandled errors (e.g. database connection errors, null pointers)
      logger.error({ err: error, path: request.url }, "Unhandled API Error");
      
      return NextResponse.json(
        { error: { code: "INTERNAL_SERVER_ERROR", message: "An unexpected error occurred" } },
        { status: 500 }
      );
    }
  };
}
