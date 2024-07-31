/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('daily_mood', (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.integer('mood_id').notNullable();
        table.integer('value').notNullable();
        table.date('date').notNullable();
        table.string('comment');
        table.timestamp('created_at').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('daily_mood')
};
