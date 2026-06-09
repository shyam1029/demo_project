import { DateTime } from "luxon";
import { column, BaseModel, belongsTo, beforeFind, beforeFetch, beforeSave } from "@ioc:Adonis/Lucid/Orm";
import { BelongsTo, ModelQueryBuilderContract } from "@ioc:Adonis/Lucid/Orm";
import { validator, schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";
import { Gender } from "App/Enums/Gender";

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id!: number;

  @column({ columnName: "user_id" })
  public userId!: number;

  @column()
  public name!: string;

  @column()
  public mobile!: string;

  @column()
  public gender!: Gender;

  @column({ columnName: "date_of_birth" })
  public dateOfBirth!: string;

  @column.dateTime({ autoCreate: true, columnName: "created_at" })
  public createdAt!: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, columnName: "updated_at" })
  public updatedAt!: DateTime;

  @column.dateTime({ columnName: "deleted_at" })
  public deletedAt!: DateTime | null;

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>;

  @beforeFind()
  @beforeFetch()
  public static ignoreDeleted(query: ModelQueryBuilderContract<typeof Profile>) {
    query.whereNull("deleted_at");
  }

  @beforeSave()
  public static async validateProfile(profile: Profile) {
    // Only validate if the record is not soft-deleted
    if (profile.deletedAt) {
      return;
    }
    await validator.validate({
      schema: schema.create({
        name: schema.string({ trim: true }, [rules.minLength(3)]),
        mobile: schema.string({ trim: true }, [rules.mobileNumber()]),
        gender: schema.enum(Object.values(Gender)),
        dateOfBirth: schema.date({ format: "yyyy-MM-dd" }),
      }),
      data: {
        name: profile.name,
        mobile: profile.mobile,
        gender: profile.gender,
        dateOfBirth: profile.dateOfBirth,
      },
    });
  }

  public async delete() {
    this.deletedAt = DateTime.local();
    await this.save();
  }
}
