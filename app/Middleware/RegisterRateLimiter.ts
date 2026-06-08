import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { RateLimiterMemory } from "rate-limiter-flexible";

const limiter = new RateLimiterMemory({ points: 10, duration: 600 });

export default class RegisterRateLimiter {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>,
  ) {
    try {
      await limiter.consume(request.ip());
      await next();
    } catch {
      return response.tooManyRequests({
        message: "Too many registration attempts. Try again after 10 minutes.",
      });
    }
  }
}
