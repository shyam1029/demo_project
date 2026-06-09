import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import Profile from "App/Models/Profile";

export default class Profiles extends BaseSchema {
  protected tableName = Profile.table;
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .notNullable()
        .unique();
      table.string("name", 30).notNullable();
      table.string("mobile", 10).notNullable();
      table.enum("gender", ["MALE", "FEMALE"]).notNullable();
      table.date("date_of_birth").notNullable();
      table.timestamp("created_at", { useTz: true }).notNullable();
      table.timestamp("updated_at", { useTz: true }).notNullable();
    });
  }
  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
