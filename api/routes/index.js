import express from 'express';
import * as accountController from '../controllers/account';

const router = express.Router();

router.post('/account', accountController.createAccount);
router.get('/account/:id', accountController.returnAccount);
router.put('/account/:id', accountController.updateAccount);
router.delete('/account/:id', accountController.deleteAccount);

export default router;
