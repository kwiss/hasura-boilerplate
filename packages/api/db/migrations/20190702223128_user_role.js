exports.up = async function(knex, Promise) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("user_role", table => {
    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table
      .uuid("role_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("role");
    table
      .uuid("user_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user_role");
};
