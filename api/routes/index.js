import express from 'express';
import { sendJsonResponse } from '../helper/helper';

import * as accountMiddleware from '../middlewares/account';
import * as userMiddleware from '../middlewares/user';
import * as residenceMiddleware from '../middlewares/residence';
import * as roomMiddleware from '../middlewares/room';
import * as boardMiddleware from '../middlewares/board';
import * as componentMiddleware from '../middlewares/component';

import * as accountController from '../controllers/account';
import * as userController from '../controllers/user';
import * as residenceController from '../controllers/residence';
import * as roomController from '../controllers/room';
import * as boardController from '../controllers/board';
import * as componentController from '../controllers/component';

const router = express.Router();

router.post('/account',  accountMiddleware.createAccount, accountController.createAccount);
router.get('/account/:idAccount', accountMiddleware.returnAndDeleteAccount, accountController.returnAccount);
router.put('/account/:idAccount', accountMiddleware.updateAccount, accountController.updateAccount);
router.delete('/account/:idAccount', accountMiddleware.returnDeleteAccount, accountController.deleteAccount);

router.post('/account/:idAccount/user', userMiddleware.createUser, userController.createUser);
router.get('/account/:idAccount/users', userMiddleware.returnUsers, userController.returnUsers);
router.get('/account/:idAccount/user/:idUser', userMiddleware.returnAndDeleteUserById, userController.returnUserById);
router.put('/account/:idAccount/user/:idUser', userMiddleware.updateUserById, userController.updateUserById);
router.delete('/account/:idAccount/user/:idUser', userMiddleware.returnAndDeleteUserById, userController.deleteUserById);

router.post('/account/:idAccount/residence', residenceMiddleware.createResidence, residenceController.createResidence);
router.get('/account/:idAccount/residences', residenceMiddleware.returnResidences, residenceController.returnResidences);
router.get('/account/:idAccount/residence/:idResidence', residenceMiddleware.returnAndDeleteResidenceById, residenceController.returnResidenceById);
router.put('/account/:idAccount/residence/:idResidence', residenceMiddleware.updateResidenceById, residenceController.updateResidenceById);
router.delete('/account/:idAccount/residence/:idResidence', residenceMiddleware.returnAndDeleteResidenceById, residenceController.deleteResidenceById);

router.post('/account/:idAccount/residence/:idResidence/room', roomMiddleware.createRoom, roomController.createRoom);
router.get('/account/:idAccount/residence/:idResidence/rooms', roomMiddleware.returnRooms, roomController.returnRooms);
router.get('/account/:idAccount/residence/:idResidence/room/:idRoom', roomMiddleware.returnAndDeleteRoomById, roomController.returnRoomById);
router.put('/account/:idAccount/residence/:idResidence/room/:idRoom', roomMiddleware.updateRoomById, roomController.updateRoomById);
router.delete('/account/:idAccount/residence/:idResidence/room/:idRoom', roomMiddleware.returnAndDeleteRoomById, roomController.deleteRoomById);

router.post('/account/:idAccount/residence/:idResidence/board', boardMiddleware.createBoard, boardController.createBoard);
router.get('/account/:idAccount/residence/:idResidence/boards', boardMiddleware.returnBoards, boardController.returnBoards);
router.get('/account/:idAccount/residence/:idResidence/board/:idBoard', boardMiddleware.returnAndDeleteBoardById, boardController.returnBoardById);
router.put('/account/:idAccount/residence/:idResidence/board/:idBoard', boardMiddleware.updateBoardById, boardController.updateBoardById);
router.delete('/account/:idAccount/residence/:idResidence/board/:idBoard', boardMiddleware.returnAndDeleteBoardById, boardController.deleteBoardById);

router.post('/account/:idAccount/residence/:idResidence/room/:idRoom/component', componentMiddleware.createComponent, componentController.createComponent);
router.get('/account/:idAccount/residence/:idResidence/room/:idRoom/components', componentMiddleware.returnComponents, componentController.returnComponents);
router.get('/account/:idAccount/residence/:idResidence/room/:idRoom/component/:idComponent', componentMiddleware.returnAndDeleteComponentById, componentController.returnComponentById);
router.put('/account/:idAccount/residence/:idResidence/room/:idRoom/component/:idComponent', componentMiddleware.updateComponentById, componentController.updateComponentById);
router.delete('/account/:idAccount/residence/:idResidence/room/:idRoom/component/:idComponent', componentMiddleware.returnAndDeleteComponentById, componentController.deleteComponentById);

router.all('*', (req, res) => sendJsonResponse(res, 404, { 'Message': 'Invalid route!' }));

export default router;
