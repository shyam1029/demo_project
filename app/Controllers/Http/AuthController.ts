import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UserServices from "App/Services/UserServices";
import UserCreationValidator from "App/Validators/UserCreationValidator";
import UserLoginValidator from "App/Validators/UserLoginValidator";

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(UserCreationValidator);
    const user = await new UserServices().registerUser(
      payload.email,
      payload.password,
    );
    return response.created({
      message: "Account created successfully",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(UserLoginValidator);
    try {
      const token = await new UserServices().authenticateUser(
        auth,
        payload.email,
        payload.password,
      );
      return response.ok({
        message: "Logged in successfully",
        token: token.toJSON(),
      });
    } catch {
      return response.unauthorized({
        message: "Invalid email or password",
      });
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use("api").revoke();
    return response.ok({
      message: "Logged out successfully",
    });
  }
}
