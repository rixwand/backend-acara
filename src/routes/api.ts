import express from 'express'
import testController from '../cotrollers/test.controller';

const router = express.Router();

router.get("/test", testController.test)

export default router;
