import express from 'express'
import { AddComment, DeleteComment, EditComment } from '../controllers/Comments.js';

const router  = express.Router()

router.post('/add', AddComment)
router.delete('/delete/:id', DeleteComment)
router.patch('/edit', EditComment)
export default router;