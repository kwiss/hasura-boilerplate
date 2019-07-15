// eslint-disable-next-line func-names
exports.up = async function(knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("role", table => {
    table
      .uuid("id")
      .primary()
      .unique()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table
      .string("name")
      .unique()
      .notNullable();
  });
};

// eslint-disable-next-line func-names
exports.down = function(knex) {
  return knex.schema.dropTable("role");
};
