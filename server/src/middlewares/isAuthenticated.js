/**
* isAuthenticated
*
* @description :: Check if user is authenticated with JSON web token.
* @info        :: For the mock authentication, the token can be found in the model.
**/

const jwt = require('../utils/JWT');
const { User } = require('../models');

function getToken(authorization='') {
  if(authorization) {
    const credentials = authorization.split(' ');
    return credentials[1];
  } else {
    throw 'Authorization credentials not informed';
  }
}

async function getUser(token) {
  const decoded = jwt.verify(token);
  if(!decoded.user) { throw 'Invalid token'; }

  const user = await User.findOne({
    attributes: ['id', 'admin', 'company'],
    where: { id: decoded.user },
  });

  if(!user) { throw 'User not found'; }

  return user;
}

async function isAuthenticated(req, res, next) {
  let token;

  try {
    token = getToken(req.headers.authorization);

    let user = await getUser(token);
    req.user = user.get({ plain: true });

    return next();
  } catch(e) {
    return res.unauthorized(e);
  }
}

module.exports = { getToken, getUser, isAuthenticated };
