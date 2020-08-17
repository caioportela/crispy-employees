/**
* isAdmin
*
* @description :: Check if user is admin
**/

async function isAdmin(req, res, next) {
  if(req.user.admin) {
    next();
  } else {
    return res.forbidden('Permission denied');
  }
}

module.exports = { isAdmin };
