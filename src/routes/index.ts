import { randomUUID } from 'crypto';
import { Router } from 'express';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

//
import Wallet from '../blockchain/Wallet';

const router = Router();

const wallet = new Wallet();

router.post('/wallet', async (req: Request, res: Response) => {
  try {
    return res.json(wallet.blocks);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
});

router.post('/create-wallet', async (req: Request, res: Response) => {
  try {
    const newKey = randomUUID();

    const walletAddress = wallet._generateWallet(newKey, req.body.amount);

    const walletBalance = wallet._checkAddressBalance(walletAddress);

    return res.json({
      walletBalance,
      walletAddress,
      newKey
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
});

router.post('/credit-wallet', async (req: Request, res: Response) => {
  try {
    const loadBalance = wallet._creditWallet(req.body.address, req.body.amount);

    return res.json(loadBalance);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
});

router.post('/debit-wallet', async (req: Request, res: Response) => {
  try {
    const loadBalance = wallet._debitWallet(req.body.key, req.body.amount);

    return res.json(loadBalance);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
});

router.get('/wallet/:key', async (req: Request, res: Response) => {
  try {
    return res.json({
      address: wallet._generatePublicAddress(req.params.key),
      balance: wallet._checkAddressBalance(wallet._generatePublicAddress(req.params.key))
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
});

export default router;
