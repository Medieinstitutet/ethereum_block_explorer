/* I tried to use ts file with web3.ts and metamask ethereum.request but I was only
errors in the TDD so switched to js file.
But at least I tried.
*/

export const web3 = new Web3('http://127.0.0.1:8545/');

interface Transaction {
  from: string;
  to: string;
  value: number;
  gas: string;
}

class Transaction {
  constructor(from: string, to: string, value: number, gas: string) {
    this.from = from,
    this.to = to,
    this.value = value,
    this.gas = gas
  }
}

const ethAddress: HTMLInputElement | null = document.querySelector('#ethAddress');
const getBalanceBtn: HTMLButtonElement | null = document.querySelector('#getBalanceBtn');
const displayBalance: HTMLParagraphElement | null = document.querySelector('#displayBalance');

const fromAddressInput: HTMLInputElement | null = document.querySelector('#fromAddress');
const toAddressInput: HTMLInputElement | null = document.querySelector('#toAddress');
const valueInput: HTMLInputElement | null = document.querySelector('#value');

const sendTransactionBtn: HTMLButtonElement | null = document.querySelector('#sendEth');
const displayBlocks: HTMLParagraphElement | null = document.querySelector('#displayBlocks');

function initApp() {
  console.log(web3);
}

let acccounts;

export async function getBalance(account: string): Promise<void> {
  // const balance: number = await web3.eth.getBalance(account);
  // const fromWei = await web3.utils.fromWei(balance, 'ether')

  if (typeof ethereum !== undefined) {
    try {
      acccounts = await ethereum.request({ method: 'eth_requestAccounts' });
      // if(displayBalance) displayBalance.innerHTML = `${web3.utils.fromWei(balance, 'ether')} ETH`;
    } catch(err) {
      console.log(err);
    }
  } else {
    console.log('No ethereum');
  }
  
  // console.log(balance);
  // console.log(fromWei);
  // return fromWei;
}

async function sendEthTransaction(to: string, from: string, amount: number, gas: string): Promise<Transaction> {
  const transaction: Transaction = new Transaction(from, to, amount, gas);

  try {
    const blockAmount = Number(await web3.eth.getBlockNumber());
    const sendTrx = await web3.eth.sendTransaction(transaction);

    if(displayBlocks) displayBlocks.innerHTML = `Amount of blocks when tranaction was made: ${blockAmount.toString()} `;
    
    console.log('sendTrx', sendTrx);
    console.log('blockAmount', blockAmount);
  } catch(err) {
    console.log(err);
  }

  console.log(transaction);
  return transaction;
}

getBalanceBtn?.addEventListener('click', async () => {
  const account: string | undefined = ethAddress?.value as string;
  await getBalance(account);
});

sendTransactionBtn?.addEventListener('click', async () => {
  const amount: number = Number(web3.utils.toWei(valueInput?.value, 'ether'));
  const toAddress: string | undefined = toAddressInput?.value as string;
  const fromAddress: string | undefined = fromAddressInput?.value as string;
  const gas: string = await web3.eth.estimateGas();

  await sendEthTransaction(toAddress, fromAddress, amount, gas);
});

if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', initApp);