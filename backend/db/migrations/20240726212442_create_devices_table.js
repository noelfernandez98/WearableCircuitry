/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('devices', (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.string('api_key').notNullable();
        table.timestamp('created_at').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('devices')
};
