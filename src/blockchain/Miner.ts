import { log } from 'util';

class Miner {
  blockchain: any;
  rewardAddress: any;
  constructor(blockchain, rewardAddress) {
    this.blockchain = blockchain;
    this.rewardAddress = rewardAddress;
  }

  startMining() {
    let miningComplete = false;
    while (!miningComplete) {
      const luckyNumber = this.blockchain._generateLuckyNumber();
      log('Mining... Num: ' + luckyNumber);
      this.blockchain._tryToMineTheBlock(luckyNumber, 'EB60c0e43b6c7791bc152e009819bb0ab056', (blockMined) => {
        if (blockMined) {
          this.blockchain._export('./experimental_blockchains/blockchain.json');
          miningComplete = true;
        }
      });
    }
  }
}

export default Miner;
