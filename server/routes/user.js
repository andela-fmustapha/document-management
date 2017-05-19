import express from 'express';
import User from '../controllers/user';
import auth from '../middlewares/auth';

const user = express.Router();

user.get('/', auth.verifyToken, auth.authorizeAdmin, User.getAllUsers);
user.get('/:id', auth.verifyToken, auth.authorizeAdmin, User.getOneUser);
user.get('/:id/documents',
auth.verifyToken, auth.authorizeAdmin, User.getUserDocuments);
user.post('/', User.createUser);
user.post('/login', User.login);
user.post('/logout', User.logout);
user.put('/:id', auth.verifyToken, auth.authorizeOwner, User.updateUser);
user.get('/active', auth.verifyToken, User.activeUser);
user.delete('/:id',
auth.verifyToken, auth.authorizeAdmin || auth.authorizeOwner, User.deleteUser);

export default user;
