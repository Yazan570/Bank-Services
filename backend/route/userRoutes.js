import express from 'express'
import session from 'express-session'
import * as controller from 'file:///c://Users//PC//OneDrive//Desktop//inspireWeb//backend//controller//userController.js'
const route  = express.Router();


route.get('/registerForm',controller.openForm);
route.get('/index',controller.isAuth,controller.index);
route.get('/',controller.getAllUsers);
route.get('/loggedIn',controller.currentUser);
route.get('/:id',controller.getUserById);
route.post('/', controller.createUser);
route.post('/login',controller.loginUser);
route.post('/logout',controller.logout);
route.delete('/:id',controller.isAdmin,controller.deleteUser);

export default route;