import type { AuthContract } from '@ioc:Adonis/Addons/Auth';
import User from "App/Models/User";

export default class UserServices {
  public async registerUser(email: string, password: string) {
    const user = await User.create({
      email: email,
      password: password,
    });
    return user;
  }

  public async authenticateUser(auth: AuthContract, email: string, password: string) {
    const token = await auth.use("api").attempt(email, password);
    return token;
  }
}
