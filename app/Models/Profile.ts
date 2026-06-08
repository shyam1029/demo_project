import { DateTime } from "luxon";
import { column, BaseModel, belongsTo } from "@ioc:Adonis/Lucid/Orm";
import { BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
export default class Profile extends BaseModel {
  @column({ isPrimary: true, columnName: "id" })
  public id!: number;

  @column({ columnName: "user_id" })
  public userId!: number;

  @column({ columnName: "name" })
  public name!: string;

  @column({ columnName: "mobile" })
  public mobile!: string;

  @column({ columnName: "gender" })
  public gender!: "MALE" | "FEMALE";

  @column({ columnName: "date_of_birth" })
  public dateOfBirth!: string;

  @column.dateTime({ autoCreate: true, columnName: "created_at" })
  public createdAt!: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    columnName: "updated_at",
  })
  public updatedAt!: DateTime;

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>;
}
