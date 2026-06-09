import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import { Gender } from "App/Enums/Gender";

export default class ProfileCreateValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3)]),
    mobile: schema.string({ trim: true }, [rules.mobileNumber()]),
    gender: schema.enum(Object.values(Gender)),
    date_of_birth: schema.date({ format: "yyyy-MM-dd" }),
  });

  public messages: CustomMessages = {
    "name.required": "Name is required",
    "name.minLength": "Name must be at least 3 characters",
    "name.maxLength": "Name cannot exceed 30 characters",
    "mobile.required": "Mobile number is required",
    "mobile.mobileNumber": "Mobile number must be exactly 10 digits",
    "gender.required": "Gender is required",
    "gender.enum": "Gender must be either MALE or FEMALE",
    "date_of_birth.required": "Date of birth is required",
    "date_of_birth.date":
      "Date of birth must be a valid date in YYYY-MM-DD form",
  };
}
