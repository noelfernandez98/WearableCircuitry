const { isAuthorized } = require('../utils/auth-utils');
const User = require('../db/models/User');

exports.createUser = async (req, res) => {
    const { first_and_last_name, password, email } = req.body;

    const user = await User.create(first_and_last_name, password, email);
    req.session.userId = user.id;

    res.send(user);
};


exports.showUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.find(id);
    if (!user) return res.sendStatus(404);

    res.send(user);
};

exports.updateUser = async (req, res) => {
    const { firstAndLastName, email, password } = req.body;
    const { id } = req.params;

    // Users need to be logged in to update a user and need to be authorized to perform this action for this particular user (users are only be able to change their own profiles)
    if (!isAuthorized(id, req.session)) return res.sendStatus(403);

    const updatedUser = await User.update(id, firstAndLastName, email, password);
    if (!updatedUser) return res.sendStatus(404)
    res.send(updatedUser);
};