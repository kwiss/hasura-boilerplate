// eslint-disable-next-line func-names
exports.up = async function(knex) {
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

// eslint-disable-next-line func-names
exports.down = function(knex) {
  return knex.schema.dropTable("user_role");
};
