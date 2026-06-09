import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up () {
    this.schema.alterTable('users', (table) => {
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
    this.schema.alterTable('profiles', (table) => {
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('deleted_at')
    })
    this.schema.alterTable('profiles', (table) => {
      table.dropColumn('deleted_at')
    })
  }
}
