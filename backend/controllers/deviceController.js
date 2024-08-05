const Device = require("../db/models/Devices.js")

const createDevice = async (req, res) => {
    try {
        const device = await Device.createDevice(req.body);
        console.log(device)
        res.status(201).json(device);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create device' });
    }
};

const getDevicesByUserId = async (req, res) => {
    try {
        console.log("--------")
        const devices = await Device.getDevicesByUserId(req.params.userId);
        console.log(devices)
        res.status(200).json(devices);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to get devices' });
    }
};

const updateDevice = async (req, res) => {
    try {
        const device = await Device.updateDevice(req.params.id, req.body);
        res.status(200).json(device);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to update device' });
    }
};

const deleteDevice = async (req, res) => {
    try {
        await Device.deleteDevice(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete device' });
    }
};

module.exports = {
    createDevice,
    getDevicesByUserId,
    updateDevice,
    deleteDevice,
};



