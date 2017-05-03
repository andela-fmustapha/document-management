import jwt from 'jsonwebtoken';
import db from '../models';

const Users = db.Users;
const secret = process.env.SECRET || 'samplesecret';

export default {

  createToken(userDetails) {
    return jwt.sign(userDetails, secret, {
      expiresIn: '24h'
    });
  },

  verifyUser(req, res, next) {
    const token = req.body.token
      || req.query.token
      || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(403).send({ message: 'Authentication failed' });
        }
        res.locals.decoded = decoded;
        next();
      });
    } else {
      return res.status(403).send({
        message: 'No token provided'
      });
    }
  },

  authorizeAdmin(req, res, next) {
    if (res.locals.decoded.roleId === 1) {
      next();
    } else {
      return res.status(403).send({ message: 'Access denied' });
    }
  },

  authorizeOwner(req, res, next) {
    Users.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ message: 'User not found' });

        if (res.locals.decoded.roleId !== 1
          && res.locals.decoded.id !== user.id) {
          return res.status(403).send({ message: 'Access denied' });
        }

        res.locals.user = user;
        next();
      })
      .catch(error => res.status(400).send(error));
  },

  hideUserDetails(user) {
    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      roleId: user.roleId,
    };
  }
};

