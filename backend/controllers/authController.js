const User = require('../db/models/User');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findByEmail(email);


    if (!user) return res.sendStatus(404);
    const isPasswordValid = await user.isValidPassword(password);

    if (!isPasswordValid) return res.sendStatus(401);

    req.session.userId = user.id;
    
    res.send(user);
};

// This controller sets `req.session` to null, destroying the cookie 
// which is the thing that keeps them logged in.
exports.logoutUser = (req, res) => {
    req.session = null;
    res.sendStatus(204);
};

// This controller returns 401 if the client is NOT logged in (doesn't have a cookie)
// or returns the user based on the userId stored on the client's cookie
exports.showMe = async (req, res) => {
    if (!req.session.userId) return res.sendStatus(401);

    const user = await User.find(req.session.userId);
    res.send(user);
};