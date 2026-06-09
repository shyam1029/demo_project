import { Rule } from "@ioc:Adonis/Core/Validator";

declare module "@ioc:Adonis/Core/Validator" {
  interface Rules {
    mobileNumber(): Rule;
  }
}
