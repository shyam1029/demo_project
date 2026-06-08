import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import { column, beforeSave, BaseModel, hasOne } from "@ioc:Adonis/Lucid/Orm";
import { HasOne } from "@ioc:Adonis/Lucid/Orm";
import Profile from "App/Models/Profile";
export default class User extends BaseModel {
  @column({ isPrimary: true, columnName: "id" })
  public id!: number;

  @column({ columnName: "email" })
  public email!: string;

  @column({ serializeAs: null, columnName: "password" })
  public password!: string;

  @column({ columnName: "remember_me_token" })
  public rememberMeToken!: string | null;

  @column.dateTime({ autoCreate: true, columnName: "created_at" })
  public createdAt!: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "updated_at",
  })
  public updatedAt!: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @hasOne(() => Profile)
  public profile!: HasOne<typeof Profile>;
}
