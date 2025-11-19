import {Router} from 'express';
import * as UserController from '../controllers/UserController.ts';
import {authenticateJWT} from '../middleware/authenticateJWT.ts';
import { authorizeAdmin, authorizeUserSelfOrAdmin } from '../middleware/authorize.ts';

import multer from 'multer';

const upload = multer ({dest : 'uploads/'});
const router = Router();

router.post('/users', UserController.createUser);

// Rotas protegidas - precisam de autenticação
router.get('/users', authenticateJWT, authorizeAdmin, UserController.getUsers);
router.get('/users/:id', authenticateJWT, authorizeAdmin, UserController.getUserById);
router.put('/users/:id', authenticateJWT, authorizeUserSelfOrAdmin, upload.single('profilePhoto'), UserController.updateUser);
router.delete('/users/:id', authenticateJWT, authorizeUserSelfOrAdmin, UserController.deleteUser);


export default router; 
