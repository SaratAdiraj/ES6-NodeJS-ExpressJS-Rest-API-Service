import express from 'express';
import { FileStore } from '../stores/FileStore.js';
import { UserService } from '../services/UserService.js';
import { UserController } from '../controllers/UserController.js';

const router = express.Router();
// 🔁 Use file-backed store instead of memory
const store = new FileStore();
const service = new UserService(store);
const controller = new UserController(new UserService());


router.get('/users', controller.listUsers);
router.post('/users/batch', controller.createUsers);
router.put('/users/batch', controller.updateUsers);
router.delete('/users/batch', controller.deleteUsers);
router.get('/users/search', controller.searchUsers);


export default router;
