import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany, hasOne, HasOne, manyToMany, ManyToMany, beforeFind, beforeFetch } from '@ioc:Adonis/Lucid/Orm'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import Role from './Role'

export default class User extends BaseModel {

  @column()
  public role_id: number

  @manyToMany(() => Role)
  public role: ManyToMany<typeof Role>

  @hasOne(() => Profile, {
  foreignKey: 'user_id'
  })
  public profile: HasOne<typeof Profile>

  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string;

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  hasOne: any

  @column.dateTime({ columnName: 'deleted_at' })
  public deletedAt: DateTime | null

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeFind()
  @beforeFetch()
  public static ignoreDeleted(query: ModelQueryBuilderContract<typeof User>) {
    query.whereNull('deleted_at')
  }

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }
}
