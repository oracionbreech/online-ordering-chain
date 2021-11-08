import { sha256 } from 'js-sha256';

class Transaction {
  from: any;
  to: any;
  amount: any;
  timestamp: Date;
  hash: any;
  constructor(from, to, amount) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.timestamp = new Date();
    this.hash = sha256(this.from + this.to + this.amount + this.timestamp);
  }
}

export default Transaction;
