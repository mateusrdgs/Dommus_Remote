import express from 'express';
import * as accountController from '../controllers/account';
import * as userController from '../controllers/user';

const router = express.Router();

router.get('/account/:id', accountController.returnAccount);
router.post('/account', accountController.createAccount);
router.put('/account/:id', accountController.updateAccount);
router.delete('/account/:id', accountController.deleteAccount);

router.post('/account/:id/users/:id', userController.createUser);
router.get('/account/:id/users', userController.returnUsers);
router.get('/account/:id/users/:id', userController.returnUserById);
router.put('/account/:id/users/:id', userController.updateUser);
router.delete('/account/:id/users/:id', userController.deleteUser);

export default router;
