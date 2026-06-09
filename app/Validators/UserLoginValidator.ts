import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UserLoginValidator {
  constructor(protected request: HttpContextContract) {}
  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email()]),
    password: schema.string(),
  });

  public messages: CustomMessages = {
    "email.required": "Email address is required",
    "email.email": "Please provide a valid email address",
    "password.required": "Password is required",
  };
}
