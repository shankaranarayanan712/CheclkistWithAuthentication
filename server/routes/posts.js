import express from 'express';

import { getPosts, createPost, updatePost,  } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getPosts);
router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);



export default router;