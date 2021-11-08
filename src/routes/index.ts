import { Router } from 'express';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Blockchain from '../blockchain/Blockchain';

const router = Router();

const blockchain = new Blockchain();

router.post('/wallet', async (req: Request, res: Response) => {
  try {
    return res.json(blockchain.blocks);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
});

router.post('/create-wallet', async (req: Request, res: Response) => {
  try {
    return res.json({
      amount: req.body.amount
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
});

export default router;
