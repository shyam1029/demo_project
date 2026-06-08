import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { RateLimiterMemory } from "rate-limiter-flexible";

const limiter = new RateLimiterMemory({ points: 5, duration: 600 });

export default class LoginRateLimiter {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>,
  ) {
    try {
      await limiter.consume(request.ip());
      await next();
    } catch {
      return response.tooManyRequests({
        message: "Too many login attempts. Try again after 10 minutes.",
      });
    }
  }
}
