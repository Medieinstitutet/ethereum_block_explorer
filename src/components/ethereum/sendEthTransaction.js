import { Transaction } from "../../models/Transaction.js";

export async function sendEthTransaction(from, to, amount) {
  const transaction = new Transaction(from, to, amount);

  try {
    await ethereum.request({ method: 'eth_sendTransaction', params: [transaction]});

    console.log(transaction);

    return transaction;
  } catch(err) {
    console.log(err);
  }

}