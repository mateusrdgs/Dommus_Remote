const express = require('express'),
      sendJsonResponse = require('../helper/helper').sendJsonResponse,
      accountMiddleware = require('../middlewares/account'),
      userMiddleware = require('../middlewares/user'),
      residenceMiddleware = require('../middlewares/residence'),
      roomMiddleware = require('../middlewares/room'),
      boardMiddleware = require('../middlewares/board'),
      componentMiddleware = require('../middlewares/component'),
      accountController = require('../controllers/account'),
      userController = require('../controllers/user'),
      residenceController = require('../controllers/residence'),
      roomController = require('../controllers/room'),
      boardController = require('../controllers/board'),
      componentController = require('../controllers/component'),
      router = express.Router();

router.post('/account', accountMiddleware.createAccount, accountController.createAccount);
router.get('/account/:idAccount', accountMiddleware.returnAndDeleteAccount, accountController.returnAccount);
router.put('/account/:idAccount', accountMiddleware.updateAccount, accountController.updateAccount);
router.delete('/account/:idAccount', accountMiddleware.returnAndDeleteAccount, accountController.deleteAccount);

router.get('/account/:idAccount/users', userMiddleware.returnUsers, userController.returnUsers);
router.post('/account/:idAccount/users/new', userMiddleware.createUser, userController.createUser);
router.get('/account/:idAccount/users/:idUser', userMiddleware.returnAndDeleteUserById, userController.returnUserById);
router.put('/account/:idAccount/users/:idUser', userMiddleware.updateUserById, userController.updateUserById);
router.delete('/account/:idAccount/users/:idUser', userMiddleware.returnAndDeleteUserById, userController.deleteUserById);

router.get('/account/:idAccount/residences', residenceMiddleware.returnResidences, residenceController.returnResidences);
router.post('/account/:idAccount/residences/new', residenceMiddleware.createResidence, residenceController.createResidence);
router.get('/account/:idAccount/residences/:idResidence', residenceMiddleware.returnAndDeleteResidenceById, residenceController.returnResidenceById);
router.put('/account/:idAccount/residences/:idResidence', residenceMiddleware.updateResidenceById, residenceController.updateResidenceById);
router.delete('/account/:idAccount/residences/:idResidence', residenceMiddleware.returnAndDeleteResidenceById, residenceController.deleteResidenceById);

router.get('/account/:idAccount/residences/:idResidence/rooms', roomMiddleware.returnRooms, roomController.returnRooms);
router.post('/account/:idAccount/residences/:idResidence/rooms/new', roomMiddleware.createRoom, roomController.createRoom);
router.get('/account/:idAccount/residences/:idResidence/rooms/:idRoom', roomMiddleware.returnAndDeleteRoomById, roomController.returnRoomById);
router.put('/account/:idAccount/residences/:idResidence/rooms/:idRoom', roomMiddleware.updateRoomById, roomController.updateRoomById);
router.delete('/account/:idAccount/residences/:idResidence/rooms/:idRoom', roomMiddleware.returnAndDeleteRoomById, roomController.deleteRoomById);

router.get('/account/:idAccount/residences/:idResidence/boards', boardMiddleware.returnBoards, boardController.returnBoards);
router.post('/account/:idAccount/residences/:idResidence/boards/new', boardMiddleware.createBoard, boardController.createBoard);
router.get('/account/:idAccount/residences/:idResidence/board/:idBoard', boardMiddleware.returnAndDeleteBoardById, boardController.returnBoardById);
router.put('/account/:idAccount/residences/:idResidence/board/:idBoard', boardMiddleware.updateBoardById, boardController.updateBoardById);
router.delete('/account/:idAccount/residences/:idResidence/board/:idBoard', boardMiddleware.returnAndDeleteBoardById, boardController.deleteBoardById);

router.get('/account/:idAccount/residences/:idResidence/rooms/:idRoom/components', componentMiddleware.returnComponents, componentController.returnComponents);
router.post('/account/:idAccount/residences/:idResidence/rooms/:idRoom/components/new', componentMiddleware.createComponent, componentController.createComponent);
router.get('/account/:idAccount/residences/:idResidence/rooms/:idRoom/components/:idComponent', componentMiddleware.returnAndDeleteComponentById, componentController.returnComponentById);
router.put('/account/:idAccount/residences/:idResidence/rooms/:idRoom/components/:idComponent', componentMiddleware.updateComponentById, componentController.updateComponentById);
router.delete('/account/:idAccount/residences/:idResidence/rooms/:idRoom/component/:idComponent', componentMiddleware.returnAndDeleteComponentById, componentController.deleteComponentById);

router.all('*', (req, res) => sendJsonResponse(res, 404, { 'Message': 'Invalid route!' }));

module.exports = router;
