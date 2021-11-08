import Blockchain from './Blockchain';

export default class Wallet extends Blockchain {
  constructor() {
    super();
  }

  _generateWallet(key: string, amount: number) {
    if (this._checkAddressBalance(this._generatePublicAddress(key)) > 0) return this._generatePublicAddress(key);

    const account = this._generatePublicAddress(key);
    this._tryToMineTheBlock(this.luckyNumber, account, amount);
    return account;
  }

  _creditWallet(address: string, amount: number) {
    this._tryToMineTheBlock(this.luckyNumber, address, amount);
    return {
      address,
      balance: this._checkAddressBalance(address)
    };
  }

  _debitWallet(key: string, amount: number) {
    const to = this._generatePublicAddress('owner');
    const from = this._generatePublicAddress(key);

    const debitWallet = this._generateTransaction({
      amount,
      from,
      privateKey: key,
      to
    });

    return {
      debitWallet,
      address: this._generatePublicAddress(key),
      balance: this._checkAddressBalance(this._generatePublicAddress(key))
    };
  }
}
