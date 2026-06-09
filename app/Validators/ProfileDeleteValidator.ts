import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";

export default class ProfileDeleteValidator {
  public schema = schema.create({
    mobile: schema.string({ trim: true }, [rules.mobileNumber()]),
  });

  public messages: CustomMessages = {
    "mobile.required": "Mobile number is required to delete your account",
    "mobile.mobileNumber": "Mobile number must be exactly 10 digits",
  };
}
