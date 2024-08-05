const authUtils = require('../../../utils/auth-utils');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('devices').del();
  await knex('daily_mood').del();
  await knex('mood').del();

  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  await knex('users').insert([
    { first_and_last_name: 'Noel Fernandez', email: 'noelfernandez98@gmail.com', password_hash: await authUtils.hashPassword('Password!', 8), created_at: '2022-01-22 03:25:28.464542+00' },
    // { name: 'rowValue1', email: '', password: '', created_at: '' },
    // { name: 'rowValue1', email: '', password: '', created_at: '' },
    // { name: 'rowValue1', email: '', password: '', created_at: '' }
  ]);

  await knex('devices').insert([
    { user_id: 1, api_key: 'HHGGJJKKLL', created_at: '2022-01-22 03:25:28.464542+00' },
    // { user_id: 1, api_key: '', created_at: '' },
    // { user_id: 1, api_key: '', created_at: '' },
    // { user_id: 1, api_key: '', created_at: '' }
  ])

  await knex('daily_mood').insert([
    { id: 1, user_id: 1, mood_id: 2, value: 7, date: '2017-01-30', comment: "", created_at: '2022-01-22 03:25:28.464542+00' },
    // { id: 1, user_id: 1, mood_id: 2, value: 7, date: '', comment: "", created_at: '' },
    // { id: 1, user_id: 1, mood_id: 2, value: 7, date: '', comment: "", created_at: '' },
    // { id: 1, user_id: 1, mood_id: 2, value: 7, date: '', comment: "", created_at: '' },
    // { id: 1, user_id: 1, mood_id: 2, value: 7, date: '', comment: "", created_at: '' },
    // { id: 1, user_id: 1, mood_id: 2, value: 7, date: '', comment: "", created_at: '' },
    // { id: 1, user_id: 1, mood_id: 2, value: 7, date: '', comment: "", created_at: '' }
  ])

  await knex('mood').insert([
    { id: 1, mood: 'Happy' },
    // { id: 2, mood: '' },
    // { id: 3, mood: '' },
    // { id: 4, mood: '' },
    // { id: 5, mood: '' }
  ])

};





