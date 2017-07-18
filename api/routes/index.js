import express from 'express';
import * as accountController from '../controllers/account';
import * as userController from '../controllers/user';
import * as residenceController from '../controllers/residence';
import * as roomController from '../controllers/room';

const router = express.Router();

router.post('/account', accountController.createAccount);
router.get('/account/:idAccount', accountController.returnAccount);
router.put('/account/:idAccount', accountController.updateAccount);
router.delete('/account/:idAccount', accountController.deleteAccount);

router.post('/account/:idAccount/user', userController.createUser);
router.get('/account/:idAccount/user', userController.returnUsers);
router.get('/account/:idAccount/user/:idUser', userController.returnUserById);
router.put('/account/:idAccount/user/:idUser', userController.updateUserById);
router.delete('/account/:idAccount/user/:idUser', userController.deleteUserById);

router.post('/account/:idAccount/residence', residenceController.createResidence);
router.get('/account/:idAccount/residence', residenceController.returnResidences);
router.get('/account/:idAccount/residence/:idResidence', residenceController.returnResidenceById);
router.put('/account/:idAccount/residence/:idResidence', residenceController.updateResidenceById);
router.delete('/account/:idAccount/residence/:idResidence', residenceController.deleteResidenceById);

router.post('/account/:idAccount/residence/:idResidence/room', roomController.createRoom);
router.get('/account/:idAccount/residence/:idResidence/room', roomController.returnRooms);
router.get('/account/:idAccount/residence/:idResidence/room/:idRoom', roomController.returnRoomById);
router.put('/account/:idAccount/residence/:idResidence/room/:idRoom', roomController.updateRoomById);
router.delete('/account/:idAccount/residence/:idResidence/room/:idRoom', roomController.deleteRoomById);

export default router;
