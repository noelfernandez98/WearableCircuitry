const knex = require('../knex');
const authUtils = require('../../utils/auth-utils');

class User {
    #passwordHash = null; // a private property
    constructor({ id, first_and_last_name, created_at, email, password_hash }) {
        this.id = id;
        this.firstAndLastName = first_and_last_name;
        this.email = email;
        this.#passwordHash = password_hash;
        this.createdAt = created_at
    }

    isValidPassword = async (password) => {
        return authUtils.isValidPassword(password, this.#passwordHash)
    };


    static async find(id) {
        const query = `SELECT * FROM users WHERE id = ?`;
        const { rows } = await knex.raw(query, [id]);
        const user = rows[0];
        return user ? new User(user) : null;
    }

    static async findByEmail(email) {
        const query = `SELECT * FROM users WHERE email = ?`;
        const { rows } = await knex.raw(query, [email]);
        const user = rows[0];

        return user ? new User(user) : null;
    }

    static async create(firstAndLastName, password, email) {
        // hash the plain-text password using bcrypt before storing it in the database
        const passwordHash = await authUtils.hashPassword(password);

        const query = `INSERT INTO users (first_and_last_name, password_hash, email, created_at)
      VALUES (?, ?, ?, ?) RETURNING *`;
        const { rows } = await knex.raw(query, [firstAndLastName, passwordHash, email, new Date]);
        const user = rows[0];
        return new User(user);
    }

    // this is an instance method that we can use to update
    static async update(id, firstAndLastName, email, password) { 
        const passwordHash = await authUtils.hashPassword(password);

        const query = `
      UPDATE users
      SET first_and_last_name=?, email=?, password_hash=?
      WHERE id=?
      RETURNING *
    `
        const { rows } = await knex.raw(query, [firstAndLastName, email, passwordHash, id])
        const updatedUser = rows[0];
        return updatedUser ? new User(updatedUser) : null;
    };

    static async deleteAll() {
        return knex('users').del()
    }
}

module.exports = User;