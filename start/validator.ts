import { validator } from "@ioc:Adonis/Core/Validator";

validator.rule(
  "mobileNumber",
  (value, _, { pointer, errorReporter, arrayExpressionPointer }) => {
    if (typeof value !== "string") {
      return;
    }
    if (!/^[0-9]{10}$/.test(value)) {
      errorReporter.report(
        pointer,
        "mobileNumber",
        "Mobile number must be exactly 10 digits",
        arrayExpressionPointer
      );
    }
  }
);
