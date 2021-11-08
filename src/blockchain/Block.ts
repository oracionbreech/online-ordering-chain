class Block {
  index: any;
  previousHash: any;
  hash: any;
  nonce: number;
  transactions: any[];
  timestamp: Date;
  constructor() {
    this.index = 0;
    this.previousHash = '';
    this.hash = '';
    this.nonce = 0;
    this.transactions = [];
    this.timestamp = new Date();
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  get key() {
    return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce;
  }
}

export default Block;
