
const knex = require('../knex');

class Device {
    constructor({ id, api_key, user_id }) {
        this.id = id;
        this.apiKey = api_key;
        this.userId = user_id;
    }
    // Method to create a new device
    static async createDevice(data) {
        const query = 'INSERT INTO devices (user_id, api_key, created_at) VALUES(?, ?, ?) RETURNING *'
        const { rows } = await knex.raw(query, [data.userID, data.apiKey, new Date]);
        const device = rows[0];
        return new Device(device);
    }

    // Method to get all devices for a specific user
    static async getDevicesByUserId(userId) {
        const query = 'SELECT * FROM devices WHERE user_id = ?';
        const { rows } = await knex.raw(query, [userId]);
        const device = rows[0];
        return device ? new Device(device) : null;
    }

    // Method to update a device by its ID
    static async updateDevice(id, data) {
        const query = 'UPDATE devices SET api_key = ? WHERE id = ? RETURNING *; ';
        const { rows } = await knex.raw(query, [data.api_key, id]);
        const updatedDevice = rows[0];
        return updatedDevice ? new Device(updatedDevice) : null;
    }

    // Method to delete a device by its ID
    static async deleteDevice(id) {
        const query = 'DELETE FROM devices WHERE id = ? RETURNING *';
        const { rows } = await knex.raw(query, [id]);
        const deletedDevice = rows[0];
        return deletedDevice ? deletedDevice : null
    }


}


module.exports = Device;
