import express from 'express';
import { sendJsonResponse } from '../helper/helper';
import * as accountController from '../controllers/account';
import * as userController from '../controllers/user';
import * as residenceController from '../controllers/residence';
import * as roomController from '../controllers/room';
import * as boardController from '../controllers/board';

const router = express.Router();

router.post('/account', accountController.createAccount);
router.get('/account/:idAccount', accountController.returnAccount);
router.put('/account/:idAccount', accountController.updateAccount);
router.delete('/account/:idAccount', accountController.deleteAccount);

router.post('/account/:idAccount/user', userController.createUser);
router.get('/account/:idAccount/users', userController.returnUsers);
router.get('/account/:idAccount/user/:idUser', userController.returnUserById);
router.put('/account/:idAccount/user/:idUser', userController.updateUserById);
router.delete('/account/:idAccount/user/:idUser', userController.deleteUserById);

router.post('/account/:idAccount/residence', residenceController.createResidence);
router.get('/account/:idAccount/residences', residenceController.returnResidences);
router.get('/account/:idAccount/residence/:idResidence', residenceController.returnResidenceById);
router.put('/account/:idAccount/residence/:idResidence', residenceController.updateResidenceById);
router.delete('/account/:idAccount/residence/:idResidence', residenceController.deleteResidenceById);

router.post('/account/:idAccount/residence/:idResidence/room', roomController.createRoom);
router.get('/account/:idAccount/residence/:idResidence/rooms', roomController.returnRooms);
router.get('/account/:idAccount/residence/:idResidence/room/:idRoom', roomController.returnRoomById);
router.put('/account/:idAccount/residence/:idResidence/room/:idRoom', roomController.updateRoomById);
router.delete('/account/:idAccount/residence/:idResidence/room/:idRoom', roomController.deleteRoomById);

router.post('/account/:idAccount/residence/:idResidence/board', boardController.createBoard);
router.get('/account/:idAccount/residence/:idResidence/boards', boardController.returnBoards);
router.get('/account/:idAccount/residence/:idResidence/board/:idBoard', boardController.returnBoardById);
router.put('/account/:idAccount/residence/:idResidence/board/:idBoard', boardController.updateBoardById);
router.delete('/account/:idAccount/residence/:idResidence/board/:idBoard', boardController.deleteBoardById);

router.all('*', (req, res) => sendJsonResponse(res, 404, { 'Message': 'Invalid route!' }));

export default router;
