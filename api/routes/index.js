const express = require('express'),
      jwt = require('express-jwt'),
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
      router = express.Router(),
      auth = jwt({
        secret: process.env.SECRET_JWT,
        userProperty: 'payload'
      });

router.post('/account/new', accountMiddleware.createAccount, accountController.createAccount);
router.post('/account/login', accountController.loginAccount);
router.get('/account/:idAccount', accountMiddleware.returnAndDeleteAccount, accountController.returnAccount);
router.put('/account/:idAccount', accountMiddleware.updateAccount, accountController.updateAccount);
router.delete('/account/:idAccount', accountMiddleware.returnAndDeleteAccount, accountController.deleteAccount);

router.get('/account/:idAccount/users', [auth, userMiddleware.returnUsers], userController.returnUsers);
router.post('/account/:idAccount/users/new', [auth, userMiddleware.createUser], userController.createUser);
router.get('/account/:idAccount/users/:idUser', [auth, userMiddleware.returnAndDeleteUserById], userController.returnUserById);
router.put('/account/:idAccount/users/:idUser', [auth, userMiddleware.updateUserById], userController.updateUserById);
router.delete('/account/:idAccount/users/:idUser', [auth, userMiddleware.returnAndDeleteUserById], userController.deleteUserById);

router.get('/account/:idAccount/residences', [auth, residenceMiddleware.returnResidences], residenceController.returnResidences);
router.post('/account/:idAccount/residences/new', [auth, residenceMiddleware.createResidence], residenceController.createResidence);
router.get('/account/:idAccount/residences/:idResidence', [auth, residenceMiddleware.returnAndDeleteResidenceById], residenceController.returnResidenceById);
router.put('/account/:idAccount/residences/:idResidence', [auth, residenceMiddleware.updateResidenceById], residenceController.updateResidenceById);
router.delete('/account/:idAccount/residences/:idResidence', [auth, residenceMiddleware.returnAndDeleteResidenceById], residenceController.deleteResidenceById);

router.get('/account/:idAccount/residences/:idResidence/rooms', [auth, roomMiddleware.returnRooms], roomController.returnRooms);
router.post('/account/:idAccount/residences/:idResidence/rooms/new', [auth, roomMiddleware.createRoom], roomController.createRoom);
router.get('/account/:idAccount/residences/:idResidence/rooms/:idRoom', [auth, roomMiddleware.returnAndDeleteRoomById], roomController.returnRoomById);
router.put('/account/:idAccount/residences/:idResidence/rooms/:idRoom', [auth, roomMiddleware.updateRoomById], roomController.updateRoomById);
router.delete('/account/:idAccount/residences/:idResidence/rooms/:idRoom', [auth, roomMiddleware.returnAndDeleteRoomById], roomController.deleteRoomById);

router.get('/account/:idAccount/residences/:idResidence/boards', [auth, boardMiddleware.returnBoards], boardController.returnBoards);
router.post('/account/:idAccount/residences/:idResidence/boards/new', [auth, boardMiddleware.createBoard], boardController.createBoard);
router.get('/account/:idAccount/residences/:idResidence/boards/:idBoard', [auth, boardMiddleware.returnAndDeleteBoardById], boardController.returnBoardById);
router.put('/account/:idAccount/residences/:idResidence/boards/:idBoard', [auth, boardMiddleware.updateBoardById], boardController.updateBoardById);
router.delete('/account/:idAccount/residences/:idResidence/boards/:idBoard', [auth, boardMiddleware.returnAndDeleteBoardById], boardController.deleteBoardById);

router.get('/account/:idAccount/residences/:idResidence/rooms/:idRoom/components', [auth, componentMiddleware.returnComponents], componentController.returnComponents);
router.post('/account/:idAccount/residences/:idResidence/rooms/:idRoom/components/new', [auth, componentMiddleware.createComponent], componentController.createComponent);
router.get('/account/:idAccount/residences/:idResidence/rooms/:idRoom/components/:idComponent', [auth, componentMiddleware.returnAndDeleteComponentById], componentController.returnComponentById);
router.put('/account/:idAccount/residences/:idResidence/rooms/:idRoom/components/:idComponent', [auth, componentMiddleware.updateComponentById], componentController.updateComponentById);
router.delete('/account/:idAccount/residences/:idResidence/rooms/:idRoom/components/:idComponent', [auth, componentMiddleware.returnAndDeleteComponentById], componentController.deleteComponentById);

router.all('*', (req, res) => sendJsonResponse(res, 404, { 'Message': 'Invalid route!' }));

module.exports = router;
